import { Request, Response } from "express";
import prisma from "../utils/db.utils";

export const getCountrySales = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;


    let whereClause: any = {};
    if (date) {
      whereClause.date = {
        gte: new Date(date as string),
      };
    }

    const countrySales = await prisma.countrySales.findMany({
      where: whereClause,
    });

    res.json(countrySales);
  } catch (error) {
    console.error("Error fetching country sales data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching country sales data" });
  }
};
