export interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  image?: string;
  images?: string[];
  category?: string;
  isActive?: boolean;
  order?: number;
  description?: string;
  sku?: string;
  bgRemoved?: boolean;
}
