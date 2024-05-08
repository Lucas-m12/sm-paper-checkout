/*
  Warnings:

  - The primary key for the `order_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `order_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_id", "product_id");
