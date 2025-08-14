import { Models } from "@rematch/core";
import { products } from "./products";

export interface RootModel extends Models<RootModel> {
  products: typeof products;
}

export const models: RootModel = { products };
