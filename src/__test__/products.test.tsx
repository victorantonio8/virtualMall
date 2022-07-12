import { render } from "@testing-library/react";
import {
  getProductById,
  getCategoriesByBusiness,
  getDetailByTicket,
  fetchProductById,
} from "../api/productsApi";
import { Product } from "../Clients/Models/productModel";
import ListProducts from "../Clients/Pages/ListProducts";

jest.mock("../supabaseClient", () => {
  return {
    from() {
      return {
        select() {
          return {
            eq() {
              return {
                data: [{ name: "test Product" }] as Product[],
              };
            },
          };
        },
      };
    },
  };
});

test("Fetch products by id", async () => {
  const result = await getProductById("testId");
  expect(result).toEqual({ name: "test Product" });
});

test("get products by business", async () => {
  const result = await getCategoriesByBusiness();
  expect(result).toEqual([{ name: "test Product" }]);
});

test("get detail product by ticket", async () => {
  const result = await getDetailByTicket(1);
  expect(result).toEqual([{ name: "test Product" }]);
});

test("fetch product by id", async () => {
  const result = await fetchProductById("testId");
  expect(result).toEqual({ name: "test Product" });
});
