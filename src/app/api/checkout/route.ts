import { CreateOrderDto } from "@/server/checkout/dto/create-order.dto";
import { OrderService } from "@/server/checkout/order.service";
import { OrderRepository } from "@/server/db/repositories/order.repository";

export async function POST(request: Request) {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const body = await request.json() as CreateOrderDto;
  try {
    await orderService.create(body);
    return Response.json({});
  } catch (error) {
    return Response.error();
  }
}