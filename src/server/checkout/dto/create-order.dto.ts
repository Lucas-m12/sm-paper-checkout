import { PaymentMethod } from "@/entities/payment-method";
import { Product } from "@/hooks/pages/types/product";

export interface CreateOrderDto {
  products: Product[],
  paymentMethod: PaymentMethod,
  coupon?: string;
}