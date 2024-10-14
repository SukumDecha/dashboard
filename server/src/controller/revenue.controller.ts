import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../utils/db.utils";

export const getRevenue = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy } = req.query;


    let whereClause = "";
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      end.setHours(23, 59, 59, 999);

      whereClause = `date >= '${start.toISOString()}' AND date <= '${end.toISOString()}'`;
    }

    let revenue;


    if (groupBy === "month" || groupBy === "year") {
      revenue = await prisma.$queryRaw<
        Array<{ date: Date; onlineSales: number; offlineSales: number }>
      >`
          SELECT
            ${
              groupBy === "month"
                ? Prisma.sql`DATE_TRUNC('month', date) as date`
                : Prisma.sql`DATE_TRUNC('year', date) as date`
            },
            SUM("onlineSales") as "onlineSales",
            SUM("offlineSales") as "offlineSales"
          FROM "Revenue"
          ${whereClause ? Prisma.sql`WHERE ${Prisma.raw(whereClause)}` : Prisma.empty}
          GROUP BY ${
            groupBy === "month"
              ? Prisma.sql`DATE_TRUNC('month', date)`
              : Prisma.sql`DATE_TRUNC('year', date)`
          }
          ORDER BY date ASC;
        `;
    } 

 
    else if (groupBy === "day") {
      revenue = await prisma.$queryRaw<
        Array<{ date: Date; onlineSales: number; offlineSales: number }>
      >`
        SELECT
          DATE("date") as date, 
          SUM("onlineSales") as "onlineSales", 
          SUM("offlineSales") as "offlineSales"
        FROM "Revenue"
        ${whereClause ? Prisma.sql`WHERE ${Prisma.raw(whereClause)}` : Prisma.empty}
        GROUP BY DATE("date")
        ORDER BY DATE("date") ASC;
      `;
    }

    res.json(
      revenue!.map((item) => {
       
        const formattedDate = new Date(item.date);

        let day = "";
        if (groupBy === "day") {
          day = formattedDate.toLocaleString("en-US", {
            weekday: "short",
          });
        }

        // } else if (groupBy === "month") {
        //   dayOrMonth = formattedDate.toLocaleString("en-US", {
        //     month: "short",
        //   });
        // }

        return {
          date: item.date,
          day, 
          onlineSales: item.onlineSales || 0,
          offlineSales: item.offlineSales || 0,
        };
      })
    );
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ error: "An error occurred while fetching revenue data" });
  }
};
