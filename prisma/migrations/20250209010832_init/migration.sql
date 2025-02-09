-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'AUTO_DEPOSIT');

-- CreateTable
CREATE TABLE "Balance" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "videoGames" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "generalSpending" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "charity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "savings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "videoGames" DOUBLE PRECISION,
    "generalSpending" DOUBLE PRECISION,
    "charity" DOUBLE PRECISION,
    "savings" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
