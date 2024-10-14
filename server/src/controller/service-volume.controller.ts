import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../utils/db.utils";
import { toObject } from "../utils/object.utils";

export const getServiceAndVolume = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy } = req.query;

    let whereClause = "";
    if (startDate && endDate) {
      const start = new Date(startDate as string);
 
      const end = new Date(endDate as string)

      end.setHours(23, 59, 59, 999);

      whereClause = `date >= '${start.toISOString()}' AND date <= '${end.toISOString()}'`;
    }

    let serviceLevels;

    
    if (groupBy === "month" || groupBy === "year") {
      serviceLevels = await prisma.$queryRaw<
        Array<{ date: Date; volume: number; services: number }>
      >`
          SELECT
            ${
              groupBy === "month"
                ? Prisma.sql`DATE_TRUNC('month', date) as date`
                : Prisma.sql`DATE_TRUNC('year', date) as date`
            },
            SUM("volume") as "volume",
            SUM("services") as "services"
          FROM "ServiceLevel"
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

      // Convert the date string back to a Date object
      serviceLevels = serviceLevels.map((item) => ({
        date: new Date(item.date), // Ensure this is a valid date
        volume: item.volume,
        services: item.services,
      }));
    } else {
      serviceLevels = await prisma.serviceLevel.findMany({
        where: whereClause
        ? {
            date: {
              gte: new Date(startDate as string),
              lte: new Date(endDate as string),
            },
          }
        : undefined,
        orderBy: {
          date: "asc",
        },
      });
    }

    // Convert BigInt to Number before sending the response
    const serializedServiceLevels = toObject(serviceLevels);

    res.json(serializedServiceLevels);
  } catch (error) {
    console.error("Error fetching service level data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching service level data" });
  }
};
