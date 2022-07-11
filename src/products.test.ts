import { getProductById } from "./api/productsApi";
import { Product } from "./Clients/Models/productModel";

jest.mock("./supabaseClient", () => {
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

jest.mock("./supabaseClient");

test("Fetch products", async () => {
  const result = await getProductById("testId");
  expect(result).toEqual({ name: "test Product" });
});
