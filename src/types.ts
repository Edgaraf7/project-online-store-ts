export type ProductsType = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
  available_quantity: number;
  shipping: {
    free_shipping: any;
  };
};

export type CategoryType = {
  id: string;
  name: string;
};

export type TreatmentProps = {
  treatment: (id: string) => void;
};

export type DetailsType = {
  title: string,
  thumbnail: string,
  price: number;
  available_quantity: number;
  description: string;
  warranty: string;
  shipping: {
    free_shipping: any;
  };
};

export type Review = {
  email: string;
  rating: number;
  text: string;
};

export type CartIconProps = {
  addToCart: (product: ProductsType) => void;
  quantity: number;
};

export type ShoppingCartProps = {
  removeProduct: (productId: string) => void;
  cart: ProductsType[];
  setCart: (cart: ProductsType[]) => void;
  quantity: number;
};
