import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Define a specific date range
  const startDate = new Date("2023-12-01");
  const endDate = new Date("2024-12-31");


  const getRandomDate = (start: Date, end: Date) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  // Generate Sales data
  for (let i = 0; i < 365; i++) {
    await prisma.sales.create({
      data: {
        date: getRandomDate(startDate, endDate), 
        totalSales: parseFloat(
          faker.finance.amount({ min: 500, max: 10000, dec: 2 })
        ),
        totalOrders: faker.number.int({ min: 10, max: 1000 }),
        productsSold: faker.number.int({ min: 5, max: 50 }),
        newCustomers: faker.number.int({ min: 0, max: 20 }),
      },
    });
  }

  // Generate Revenue data
  for (let i = 0; i < 365; i++) {
    await prisma.revenue.create({
      data: {
        date: getRandomDate(startDate, endDate), 
        onlineSales: parseFloat(
          faker.finance.amount({ min: 300, max: 5000, dec: 2 })
        ),
        offlineSales: parseFloat(
          faker.finance.amount({ min: 200, max: 3000, dec: 2 })
        ),
      },
    });
  }

  // Generate Customer data
  const customerTypes = ["Loyal", "New", "Unique"];
  for (let i = 0; i < 365; i++) {
    for (const type of customerTypes) {
      await prisma.customer.create({
        data: {
          type,
          count: faker.number.int({ min: 10, max: 500 }),
          date: getRandomDate(startDate, endDate), 
        },
      });
    }
  }

  // Generate Customer Satisfaction data
  for (let i = 0; i < 365; i++) {
    await prisma.customerSatisfaction.create({
      data: {
        date: getRandomDate(startDate, endDate), 
        score: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      },
    });
  }

  // Generate Product data
  const productNames = [
    "Home Decor Range",
    "Disney Princess Pink Bag 18",
    "Bathroom Essentials",
    "Apple Smartwatches",
    "Samsung Galaxy S21",
    "Sony PlayStation 5",
    "Nike Air Max",
    "Adidas Superstar",
  ];
  for (let i = 0; i < 100; i++) {
    const name = productNames[i % productNames.length];
    await prisma.product.create({
      data: {
        name,
        popularity: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
        sales: faker.number.int({ min: 100, max: 10000 }),
        date: getRandomDate(startDate, endDate), 
      },
    });
  }

  // Generate Country Sales data
  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "India",
  ];

  for (let i = 0; i < 100; i++) {
    const country = countries[i % countries.length]
    await prisma.countrySales.create({
      data: {
        country,
        sales: parseFloat(
          faker.finance.amount({ min: 10000, max: 1000000, dec: 2 })
        ),
        date: getRandomDate(startDate, endDate), // Use random date within range
      },
    });
  }

  // Generate Target vs Reality data
  for (let i = 0; i < 30; i++) {
    await prisma.target.create({
      data: {
        date: getRandomDate(startDate, endDate), // Use random date within range
        targetSales: parseFloat(
          faker.finance.amount({ min: 50000, max: 200000, dec: 2 })
        ),
        realitySales: parseFloat(
          faker.finance.amount({ min: 40000, max: 210000, dec: 2 })
        ),
      },
    });
  }

  // Generate Service Level data
  for (let i = 0; i < 12; i++) {
    await prisma.serviceLevel.create({
      data: {
        date: getRandomDate(startDate, endDate), // Use random date within range
        volume: faker.number.int({ min: 100, max: 1000 }),
        services: faker.number.int({ min: 50, max: 500 }),
      },
    });
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
