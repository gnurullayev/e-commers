export interface IProduct {
  id: number;
  category?: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
