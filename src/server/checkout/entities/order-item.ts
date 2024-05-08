export class OrderItem {
  private _id: string;
  private _code: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    code: string,
    price: number,
    quantity: number,
  ) {
    this._id = id;
    this._code = code;
    this._price = price;
    this._quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }

  get id() {
    return this._id;
  }

  get code() {
    return this._code;
  }

  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }

}