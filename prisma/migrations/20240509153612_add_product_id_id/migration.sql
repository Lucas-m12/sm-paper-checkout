/*
  Warnings:

  - The primary key for the `order_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `product_id` on table `order_item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_product_id_fkey";

-- AlterTable
ALTER TABLE "order_item" DROP CONSTRAINT "order_item_pkey",
ALTER COLUMN "product_id" SET NOT NULL,
ADD CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_id", "product_id");

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
