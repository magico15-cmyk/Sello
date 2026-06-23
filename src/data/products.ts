export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  gender: string;
  size: string;
  isFavorite: boolean;
  inventory: "Tracked" | "Untracked";
  stock: number;
  orders: number;
  visibility: "Visible" | "Hidden" | "Draft";
  createdAt: string;
}


