import { PaymentMethod } from "./payment-method";

export class Order {
  static calculateFee(paymentMethod: PaymentMethod, value: number): number {
    switch (paymentMethod) {
      case PaymentMethod.DEBT:
        return (value * 1.4) / 100;
      case PaymentMethod.CREDIT:
        return (value * 3.1) / 100;
      default:
        return 0;
    }
  }
}