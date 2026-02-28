export type Product = {
  id: string;
  name: string;
  price: string;
  sku?: string;
  image: string;
  bgRemoved?: boolean; // 👈 NEW
};
  
  export const mockProducts: Product[] = [
    {
      id: "1",
      name: "Mango Masti",
      price: "₹35",
      sku: "LM-001",
      image: "https://plus.unsplash.com/premium_photo-1695673579223-df34be8ed0c8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgRemoved: false,
    },
    {
      id: "2",
      name: "Bubble Gum",
      price: "₹30",
      sku: "LM-002",
      image: "https://plus.unsplash.com/premium_photo-1664040392328-8af15290c474?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bgRemoved: false,
    },
    {
      id: "3",
      name: "Coffee",
      price: "₹35",
      sku: "LM-003",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600",
      bgRemoved: false,
    },
  ];
  