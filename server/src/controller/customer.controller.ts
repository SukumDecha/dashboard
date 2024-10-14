import { Request, Response } from "express";
import prisma from "../utils/db.utils";
import { Prisma } from "@prisma/client";
import { toObject } from "../utils/object.utils";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, groupBy = "day" } = req.query;

    let whereClause = "";
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      end.setHours(23, 59, 59, 999);

      whereClause = `date >= '${start.toISOString()}' AND date <= '${end.toISOString()}'`;
    }

    let customers;

    if (groupBy === "month" || groupBy === "year") {
      customers = await prisma.$queryRaw<
        Array<{ date: Date; type: string; count: number }>
      >`
          SELECT
            ${
              groupBy === "month"
                ? Prisma.sql`DATE_TRUNC('month', date) as date`
                : Prisma.sql`DATE_TRUNC('year', date) as date`
            },
            type,
            SUM(count) as count
          FROM "Customer"
            ${
              whereClause
                ? Prisma.sql`WHERE ${Prisma.raw(whereClause)}`
                : Prisma.empty
            }
          GROUP BY ${
            groupBy === "month"
              ? Prisma.sql`DATE_TRUNC('month', date)`
              : Prisma.sql`DATE_TRUNC('year', date)`
          }, type
          ORDER BY date ASC, type
        `;
    } else if (groupBy === "day") {
      customers = await prisma.customer.groupBy({
        by: ["type"],
        where: whereClause
          ? {
              date: {
                gte: new Date(startDate as string),
                lte: new Date(endDate as string),
              },
            }
          : undefined,
        _sum: {
          count: true,
        },
        orderBy: [{ type: "asc" }],
      });

      customers = customers.map((item) => ({
        type: item.type,
        count: item._sum.count || 0,
      }));
    } else {
      customers = await prisma.customer.findMany({
        where: whereClause
          ? {
              date: {
                gte: new Date(startDate as string),
                lte: new Date(endDate as string),
              },
            }
          : undefined,
        orderBy: [{ date: "asc" }, { type: "asc" }],
      });
    }

    const serializedServiceLevels = toObject(customers);

    res.json(serializedServiceLevels);
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching customer data" });
  }
};

export const getCustomerSatisfaction = async (req: Request, res: Response) => {
  try {
    const { selectedDate } = req.query;
    
    const jsSelectedDate = new Date(`${selectedDate}`);
    const prismaSelectedDate = jsSelectedDate.toISOString();
     
    const customerStatisfactionDataOfThisMonth = await prisma.customerSatisfaction.findMany({
      where: {
        date: {
          gte: new Date(jsSelectedDate.getFullYear(), jsSelectedDate.getMonth(), 1), // First day of the month
          lte: prismaSelectedDate
        }
      },
      orderBy: {
        date: "asc"
      }
    })

    const customerStatisfactionDataOfLastMonth = await prisma.customerSatisfaction.findMany({
      where: {
        date: {
          gte: new Date(jsSelectedDate.getFullYear(), jsSelectedDate.getMonth() - 1, 1), // First day of the last month
          lte: new Date(jsSelectedDate.getFullYear(), jsSelectedDate.getMonth() - 1, jsSelectedDate.getDate())
        }
      },
      orderBy: {
        date: "asc"
      }
    })

    // Find list of both month and keep it seperately
    // For each day of last month
    // Concat into this format
    /* 
      {
        date: 1,
        thisMonth:
        lastMonth:
      }
    */

      
    const format = customerStatisfactionDataOfLastMonth.map(cS => {
      const currentDate = cS.date.getUTCDate();
      
      const thisMonthData = customerStatisfactionDataOfThisMonth.find(cS => cS.date.getUTCDate() === currentDate);

      return {
        date: `${currentDate}`,
        thisMonth: thisMonthData?.score,
        lastMonth: cS.score
      }
    });

    const cacheDate: string | string[] = []

    const groupDate = format.reduce((acc, cur) => {
      if (!cacheDate.includes(cur.date)) {
        cacheDate.push(cur.date);
        acc.push({date: cur.date, thisMonth: cur.thisMonth || 0, lastMonth: cur.lastMonth});
      }
      return acc;
    }, [{}]);

    res.status(200).json([...groupDate]);
    
  } catch (error) {
    res.status(500).json({message: "Error getting customer satisfaction", error})
  }
};