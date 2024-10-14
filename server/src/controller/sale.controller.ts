import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../utils/db.utils";

type GroupedSale = {
  date: Date;
  totalSales: number;
  totalOrders: number;
  productsSold: number;
  newCustomers: number;
};

export const getSales = async (req: Request, res: Response) => {
  try {
    const {
      sortBy = "date",
      sortOrder = "desc",
      startDate,
      endDate,
      groupBy,
    } = req.query;

    let whereClause = "";
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      // Set end date to the end of the day
      end.setHours(23, 59, 59, 999);

      whereClause = `date >= '${start.toISOString()}' AND date <= '${end.toISOString()}'`;
    }

    let result;

    if (groupBy) {
      result = await prisma.$queryRaw<GroupedSale[]>`
          SELECT
            ${
              groupBy === "day"
                ? Prisma.sql`date`
                : groupBy === "month"
                ? Prisma.sql`DATE_TRUNC('month', date) as date`
                : Prisma.sql`DATE_TRUNC('year', date) as date`
            },
            SUM("totalSales") as "totalSales",
            SUM("totalOrders") as "totalOrders",
            SUM("productsSold") as "productsSold",
            SUM("newCustomers") as "newCustomers"
          FROM "Sales"
          ${
            whereClause
              ? Prisma.sql`WHERE ${Prisma.raw(whereClause)}`
              : Prisma.empty
          }
          GROUP BY ${
            groupBy === "day"
              ? Prisma.sql`date`
              : groupBy === "month"
              ? Prisma.sql`DATE_TRUNC('month', date)`
              : Prisma.sql`DATE_TRUNC('year', date)`
          }
          ORDER BY ${Prisma.raw(`"${sortBy}" ${sortOrder}`)}
        `;
    } else {
      result = await prisma.sales.findMany({
        where: whereClause
          ? {
              date: {
                gte: new Date(startDate as string),
                lte: new Date(endDate as string),
              },
            }
          : undefined,
        orderBy: { [sortBy as string]: sortOrder },
      });
    }

    const formattedSales = result.map((sale) => ({
      ...sale,
      totalSales: Number(sale.totalSales),
      totalOrders: Number(sale.totalOrders),
      productsSold: Number(sale.productsSold),
      newCustomers: Number(sale.newCustomers),
    }));

    res.json(formattedSales);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching sales data" });
  }
};
