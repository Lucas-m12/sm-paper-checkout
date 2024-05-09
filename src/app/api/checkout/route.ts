import { logger } from "@/config/logger";
import { CreateOrderDto } from "@/server/checkout/dto/create-order.dto";
import { OrderService } from "@/server/checkout/order.service";
import { OrderRepository } from "@/server/db/repositories/order.repository";

export async function POST(request: Request) {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const body = await request.json() as CreateOrderDto;
  logger.info('converted body', {
    body
  });
  try {
    const output = await orderService.create(body);
    return Response.json(output);
  } catch (error: any) {
    logger.error(error?.message ?? 'error', {
      error,
    });
    return Response.error();
  }
}