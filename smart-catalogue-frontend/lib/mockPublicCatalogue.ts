export type PublicCatalogueProduct = {
    id: string;
    name: string;
    price: string;
    sku: string;
    image: string;
    description: string;
  };
  
  export const mockPublicCatalogue = {
    businessName: "NP MART INDIA",
    title: "Premium Flavored Drinks",
    description: "Refreshing drinks with authentic flavors",
    products: [
      {
        id: "1",
        name: "Mango Masti",
        price: "₹35",
        sku: "LM-001",
        image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=800",
        description: "Premium quality mango flavored drink",
      },
      {
        id: "2",
        name: "Bubble Gum",
        price: "₹30",
        sku: "LM-002",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800",
        description: "Sweet bubble gum flavored drink",
      },
      {
        id: "3",
        name: "Coffee",
        price: "₹35",
        sku: "LM-003",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
        description: "Rich coffee flavored drink",
      },
    ],
  };