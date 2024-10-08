export interface Category {
  id: string;
  name: string;
  url: string;
}

export interface Stock {
  availability: number;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  discount_rate: number;
  stock?: Stock;
  description: string;
  photo: string | null;
  category_id: string;
}

export type MenuData = {
  categories: Category[];
  items: Item[];
};

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  currentQuantity?: number; // The quantity of the item in the basket
  availableQuantity?: number; // The remaining quantity available for the item
  maxQuantity: number; // The initial availability of the item
}
