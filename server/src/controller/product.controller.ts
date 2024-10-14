import { Request, Response } from "express";
import prisma from "../utils/db.utils";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      sortBy = "sales",
      sortOrder = "desc",
      startDate,
      endDate,
    } = req.query;

    let whereClause: any = {};
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) {
        whereClause.date.gte = new Date(startDate as string);
      }
      if (endDate) {
        whereClause.date.lte = new Date(endDate as string);
      }
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { [sortBy as string]: sortOrder },
      take: 4,
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching product data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product data" });
  }
};
