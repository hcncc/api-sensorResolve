/*
  Warnings:

  - You are about to drop the `government` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "enterprises" ADD COLUMN "address" TEXT;
ALTER TABLE "enterprises" ADD COLUMN "industryType" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "government";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "reports";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "sensor_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    "co2Level" REAL NOT NULL,
    "coLevel" REAL NOT NULL,
    "ch4Level" REAL NOT NULL,
    "pm25" REAL NOT NULL,
    "pm10" REAL NOT NULL,
    "nh3Level" REAL NOT NULL,
    "no2Level" REAL NOT NULL,
    "ozoneLevel" REAL NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "sensor_data_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gas_emissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coLevel" REAL NOT NULL,
    "ch4Level" REAL NOT NULL,
    "nh3Level" REAL NOT NULL,
    "no2Level" REAL NOT NULL,
    "ozoneLevel" REAL NOT NULL,
    "enterpriseId" INTEGER NOT NULL,
    CONSTRAINT "gas_emissions_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "enterprises" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
