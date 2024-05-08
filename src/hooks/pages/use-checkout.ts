import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/entities/order";
import { PaymentMethod } from "@/entities/payment-method";
import { useEffect, useMemo, useState } from "react";
import { Product } from "./types/product";

export const useCheckout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.MONEY);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const { toast } = useToast();

  const productsData = useMemo(() => {
    const subTotal = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const fee = Order.calculateFee(paymentMethod, subTotal);
    return {
      subTotal,
      fee,
      total: (subTotal - discount) + fee,
    }
  }, [products, discount, paymentMethod]);

  const handleAddProduct = () => {
    if (!productCode || !productName || !productPrice || !productQuantity) return;
    const existedProduct = products.find(product => product.code === productCode);
    if (existedProduct) {
      const items = new Set<Product>(products);
      const newQuantity = existedProduct.quantity + productQuantity;
      items.delete(existedProduct);
      items.add({
        ...existedProduct,
        quantity: newQuantity
      });
      const newProducts = Array.from(items);
      setProducts(newProducts);
    } else {
      setProducts(
        prevProducts => [
          ...prevProducts,
          {
            code: productCode,
            name: productName,
            price: productPrice,
            quantity: productQuantity,
          }
        ]
      );
    }
    cleanProduct();
  }

  const handleRemoveProduct = (product: Product) => {
    const productIndex = products.findIndex(productItem => productItem.code === product.code);
    if (product.quantity > 1) {
      const items = new Set<Product>(products);
      items.delete(product);
      product.quantity -= 1;
      items.add(product);
      const newProducts = Array.from(items);
      setProducts(newProducts);
    } else {
      setProducts(
        prevProducts => prevProducts.filter(prevProduct => prevProduct.code !== product.code)
      );
    }
  }

  const handleCheckout = async () => {
    const result = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        products,
        fee: productsData.fee,
        total: productsData.total,
        paymentMethod,
      })
    });
    if (result.ok) {
      toast({
        title: 'Pedido cadastrado com sucesso',
      });
      cleanProduct();
      setProducts([]);
    } else {
      toast({
        title: "Não foi possível cadastrar o pedido",
        variant: 'destructive'
      });
    }
  };

  const cleanProduct = () => {
    setProductName('');
    setProductCode('');
    setProductPrice(0);
    setProductQuantity(0);
  }

  useEffect(() => {
    Order.calculateFee(paymentMethod, productsData.subTotal);
  }, [paymentMethod, productsData.subTotal]);

  return {
    products,
    productName,
    productCode,
    productPrice,
    productQuantity,
    productsData,
    discount,
    coupon,
    paymentMethod,
    toast,
    setPaymentMethod,
    setCoupon,
    setProductName,
    setProductCode,
    setProductPrice,
    setProductQuantity,
    handleAddProduct,
    handleRemoveProduct,
    handleCheckout
  };
}