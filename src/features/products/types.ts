import Product from "../../network/models/Product";

export interface ProductState {
  list: Product[] | any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Product | null;
}

export interface ProductType {
  _id: string;
  key: string;
  productName: string;
  description?: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId?: string;
  categoryName?: string;
  settings?: React.ReactNode;
}
