import { logger } from "@/config/logger";
import { OrderService } from "@/server/checkout/order.service";
import { OrderRepository } from "@/server/db/repositories/order.repository";

export async function GET(request: Request) {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  try {
    const result = await orderService.findAll();
    logger.info('fetched orders', { orders: result });
    return Response.json(result);
  } catch (error: any) {
    logger.error(error?.message ?? 'error', { error });
    return Response.error();
  }
}
