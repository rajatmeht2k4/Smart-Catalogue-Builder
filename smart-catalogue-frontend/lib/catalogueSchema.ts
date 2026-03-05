export type Business = {
    name: string;
    tagline?: string;
    brandColor: string;
    whatsapp: string;
  };
  
  export type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
  };