'use client';

import { Sidebar } from "@/components/Sidebar";
import { PixIcon } from "@/components/icons/pix.icon";
import PlaceholderIcon from "@/components/icons/placeholder.icon.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentMethod } from "@/entities/payment-method";
import { useCheckout } from "@/hooks/pages/use-checkout";
import { CircleDollarSignIcon, CreditCardIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";


const VendaPage = () => {
  const {
    productCode,
    productName,
    productPrice,
    productQuantity,
    productsData,
    products,
    discount,
    coupon,
    paymentMethod,
    setCoupon,
    setProductCode,
    setProductName,
    setProductPrice,
    setProductQuantity,
    handleAddProduct,
    handleRemoveProduct,
    setPaymentMethod,
    handleCheckout
  } = useCheckout();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <section className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-40 min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8 sm:px-10 sm:py-10">
                <form className="space-y-6">
                  <div className="flex flex-col gap-4 justify-between mb-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="product-code">
                        Código do produto
                      </Label>
                      <Input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        id="product-code"
                        placeholder="Digite o código do produto"
                        type="text"
                        value={productCode}
                        onChange={(event) => setProductCode(event.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="product-name">
                        Nome do produto
                      </Label>
                      <Input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        id="product-name"
                        placeholder="Digite o nome do produto"
                        type="text"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="product-price">
                        Preço do produto
                      </Label>
                      <Input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        id="product-price"
                        placeholder="Digite o preço do produto"
                        type="number"
                        value={productPrice}
                        onChange={(event) => setProductPrice(parseFloat(event.target.value))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="product-quantity">
                        Quantidade
                      </Label>
                      <Input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        id="product-quantity"
                        placeholder="Digite a quantidade do produto"
                        type="number"
                        onChange={(event) => setProductQuantity(parseInt(event.target.value))}
                        value={productQuantity}
                      />
                    </div>
                  </div>
                  <Button className="w-full" type="button" onClick={handleAddProduct}>
                    Adicionar
                  </Button>
                </form>
              </div>
            </div>
            <section className="flex flex-col max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden px-6 py-8 sm:px-10 sm:py-10 gap-8">
              <div className="max-h-72 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Preço unitário</TableHead>
                      <TableHead className="text-right" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={`${Math.random()}-${product.code}-${product.name}`}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <Image
                              alt="product image"
                              className="rounded-md"
                              height={64}
                              src={PlaceholderIcon}
                              style={{
                                aspectRatio: "64/64",
                                objectFit: "cover",
                              }}
                              width={64}
                            />
                            <div className="grid gap-1">
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">#{product.code}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          {
                            Intl.NumberFormat(
                              'pt-BR',
                              {
                                currency: 'BRL',
                                style: 'currency'
                              }
                            ).format(product.price)
                          }
                        </TableCell>
                        <TableCell
                          className="text-right cursor-pointer"
                          onClick={() => handleRemoveProduct(product)}
                        >
                          <Trash2Icon className="text-right text-red-600" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {
                !products.length ? null : (
                  <>
                    <div className="grid gap-6">
                      <div className="border rounded-lg p-6 grid gap-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium">Pagamento</h2>
                          <div className="flex items-center gap-2">
                            {
                              (
                                paymentMethod === PaymentMethod.CREDIT ||
                                paymentMethod === PaymentMethod.DEBT
                              ) && (
                                <CreditCardIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              )
                            }
                            {
                              paymentMethod === PaymentMethod.PIX && (
                                <PixIcon style={{ width: 24, height: 24 }} />
                              )
                            }
                            {
                              paymentMethod === PaymentMethod.MONEY && (
                                <CircleDollarSignIcon />
                              )
                            }
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="payment-method">Método de pagamento</Label>
                            <Select
                              defaultValue={PaymentMethod.MONEY}
                              onValueChange={
                                (value) => setPaymentMethod(value as PaymentMethod)
                              }
                              value={paymentMethod}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o método de pagamento" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={PaymentMethod.MONEY}>Dinheiro</SelectItem>
                                <SelectItem value={PaymentMethod.PIX}>Pix</SelectItem>
                                <SelectItem value={PaymentMethod.CREDIT}>
                                  Cartão de crédito
                                </SelectItem>
                                <SelectItem value={PaymentMethod.DEBT}>Cartão de débito</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="coupon">Código de desconto</Label>
                            <div className="flex">
                              <Input
                                id="coupon"
                                placeholder="Digite o cupom"
                                value={coupon}
                                onChange={(event) => setCoupon(event.target.value)}
                              />
                              <Button
                                className="ml-2"
                                variant="outline"
                              >
                                Aplicar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium">Resumo do pedido</h2>
                        <div className="text-right">
                          <div className="text-gray-500 dark:text-gray-400">Subtotal</div>
                          <div className="font-medium">
                            {
                              Intl.NumberFormat(
                                'pt-BR', { currency: 'BRL', style: 'currency' }
                              ).format(productsData.subTotal)
                            }
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500 dark:text-gray-400">Taxa</div>
                        <div className="font-medium">
                          {
                            Intl.NumberFormat(
                              'pt-BR', { currency: 'BRL', style: 'currency' }
                            ).format(productsData.fee)
                          }
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="text-gray-500 dark:text-gray-400">Desconto</div>
                        <div className="font-medium">
                          {
                            Intl.NumberFormat(
                              'pt-BR', { currency: 'BRL', style: 'currency' }
                            ).format(discount)
                          }
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-medium">Total</div>
                        <div className="text-lg font-medium">
                          {
                            Intl.NumberFormat(
                              'pt-BR', { currency: 'BRL', style: 'currency' }
                            ).format(productsData.total)
                          }
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={!products.length}
                        onClick={handleCheckout}
                      >
                        Concluir compra
                      </Button>
                    </div>
                  </>
                )
              }
            </section>
          </div>
        </main>
      </section>
    </div>
  );
}

export default VendaPage;