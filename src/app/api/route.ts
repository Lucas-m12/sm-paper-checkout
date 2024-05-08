import { OrderService } from "@/server/checkout/order.service";
import { OrderRepository } from "@/server/db/repositories/order.repository";

export async function GET(request: Request) {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const result = await orderService.findAll();
  return Response.json(result);
}
