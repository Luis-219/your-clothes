export interface Order {
  id: number;
  id_user: number;
  user_name: string;
  code: string;
  shippingmethod: string;
  adress_shipping: string;
  paymentmethod: string;
  quantityproducts: number;
  orderdate: Date;
  totalpaid: number;
}
export interface OrderProduct {
  id: number;
  id_order:number;
  product: string;
  quantity: number;
  totalprice: number;
}
export interface Shipping {
  id: number;
  name: string;
}
export interface Payment {
  id: number;
  name: string;
}
