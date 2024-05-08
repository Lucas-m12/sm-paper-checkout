import { PaymentMethod } from "@/entities/payment-method";
import { OrderItem } from "./order-item";

export class Order {

  constructor(
    private _id: string,
    private _orderItems: OrderItem[],
    private _paymentMethod: PaymentMethod,
  ) { }
  
  getTotal() {
    return this._orderItems.reduce((acc, item) => acc + item.getTotal(), 0);
  }

  get id() {
    return this._id;
  }

  get orderItems() {
    return this._orderItems;
  }

  get paymentMethod() {
    return this._paymentMethod;
  }
}