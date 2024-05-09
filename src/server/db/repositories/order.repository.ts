import { logger } from "@/config/logger";
import { Order } from "@/server/checkout/entities/order";
import { prisma } from "../prisma.service";

export class OrderRepository {
  async create(order: Order) {
    await prisma.order.create({
      data: {
        id: order.id,
        paymentMethod: order.paymentMethod,
        createdAt: new Date(),
        updatedAt: new Date(),
        total: order.getTotal(),
        orderItem: {
          create: order.orderItems.map((item) => ({
            quantity: item.quantity,
            createdAt: new Date(),
            updatedAt: new Date(),
            product: {
              connectOrCreate: {
                where: {
                  code: item.code,
                },
                create: {
                  id: item.id,
                  code: item.code,
                  price: item.price,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              },
            },
          })),
        },
      },
    });
  }

  async findAll() {
    logger.info('fetching all orders');
    return prisma.order.findMany({
      include: {
        orderItem: {
          include: {
            product: true
          }
        },
      }
    });
  }
}
