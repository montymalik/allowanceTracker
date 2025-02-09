// pages/api/resetBalance.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const updatedBalance = await prisma.balance.update({
        where: { id: 1 }, // assumes a single record with id = 1
        data: {
          videoGames: 0,
          generalSpending: 0,
          charity: 0,
          savings: 0,
        },
      });
      res.status(200).json(updatedBalance);
    } catch (error) {
      console.error("Error resetting balance:", error);
      res.status(500).json({ error: "Error resetting balance" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

