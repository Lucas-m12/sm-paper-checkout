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
    const orderItems = products.map(
      product => new OrderItem(
        randomUUID(),
        product.code,
        product.price,
        product.quantity
      )
    );
    const order = new Order(randomUUID(), orderItems, paymentMethod);
    let discount = 0;
    if (coupon) {
      //todo: calculate discount
      discount = 0;
    }
    await this.orderRepository.create(order);
  }

  async findAll() {
    return this.orderRepository.findAll();
  }
}