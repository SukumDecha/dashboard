import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../utils/db.utils";

export const getTargetAndReality = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy } = req.query;

    let whereClause = "";
    if (startDate && endDate) {
      const start = new Date(startDate as string);
 
      const end = new Date(endDate as string)

      end.setHours(23, 59, 59, 999);

      whereClause = `date >= '${start.toISOString()}' AND date <= '${end.toISOString()}'`;
    }

    let targets;

    if (groupBy === "month" || groupBy === "year") {
      targets = await prisma.$queryRaw<
        Array<{ date: Date; targetSales: number; realitySales: number }>
      >`
          SELECT
            ${
              groupBy === "month"
                ? Prisma.sql`DATE_TRUNC('month', date) as date`
                : Prisma.sql`DATE_TRUNC('year', date) as date`
            },
            SUM("targetSales") as "targetSales",
            SUM("realitySales") as "realitySales"
          FROM "Target"
          ${
            whereClause
              ? Prisma.sql`WHERE ${Prisma.raw(whereClause)}`
              : Prisma.empty
          }
          GROUP BY ${
            groupBy === "month"
              ? Prisma.sql`DATE_TRUNC('month', date)`
              : Prisma.sql`DATE_TRUNC('year', date)`
          }
          ORDER BY date ASC
        `;
    } else  {
      targets = await prisma.target.groupBy({
        by: ["date"],
        where: whereClause
        ? {
            date: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          }
        : undefined,
        _sum: {
          targetSales: true,
          realitySales: true,
        },
        orderBy: {
          date: "asc",
        },
      });

      targets = targets.map((item) => ({
        date: item.date,
        targetSales: item._sum.targetSales || 0,
        realitySales: item._sum.realitySales || 0,
      }));
    }

    res.json(targets);
  } catch (error) {
    console.error("Error fetching target data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching target data" });
  }
};
