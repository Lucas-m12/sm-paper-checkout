import { logger } from "@/config/logger";
import { randomUUID } from "crypto";
import { OrderRepository } from "../db/repositories/order.repository";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order";
import { OrderItem } from "./entities/order-item";

export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository
  ) { }
  
  async create(createOrderDto: CreateOrderDto) {
    const { paymentMethod, products, coupon } = createOrderDto;
    logger.info('init proccess to create order');
    const orderItems = products.map(
      product => new OrderItem(
        randomUUID(),
        product.code,
        product.price,
        product.quantity
      )
    );
    logger.info("order items created", {
      orderItems
    });
    const order = new Order(randomUUID(), orderItems, paymentMethod);
    let discount = 0;
    if (coupon) {
      //todo: calculate discount
      discount = 0;
    }
    logger.info("saving order on db", {
      order,
    });
    await this.orderRepository.create(order);
    logger.info("order saved");
    return order;
  }

  async findAll() {
    return this.orderRepository.findAll();
  }
}