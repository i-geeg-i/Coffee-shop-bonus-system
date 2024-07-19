import { supabase } from "@/src/supabase/supabaseClient";
import CartItem from "./CartItem";
import { createClient } from "@/src/supabase/server";

type Product = {
  id: string;
  amount: number;
};

type Data = {
  cart: {
    promo: string;
    products: Product[];
  };
};

type ProductDisp = {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
};
let total: number = 0;
export function getTotal(): number {
  return total;
}

export function setTotal(params: number) {
  total = params;
}
export default async function CartItems(onChange: {
  onChange: () => React.JSX.Element;
}) {
  const supabase = createClient();
  let cart: Data;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // alert("Please login, to add to the cart!")
    return <p>You should login first!</p>;
  } else {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single();

    if (error || !data) {
      console.error("Error fetching cart:", error);
      return <p>Error loading cart</p>;
    }

    cart = data.cart as Data;

    const products = await Promise.all(
      cart.cart.products.map(async (product) => {
        const { data, error } = await supabase
          .from("products")
          .select()
          .eq("id", product.id)
          .single();

        if (error) {
          console.error("Error fetching product:", error);
          return null;
        }
        let help: ProductDisp = data as ProductDisp;
        help.amount = product.amount;
        return help as ProductDisp;
      }),
    );

    const validProducts = products.filter(
      (product) => product !== null,
    ) as ProductDisp[];

    return (
      <>
        <div className="products in cart" style={{ display: "block" }}>
          {validProducts.length > 0 ? (
            validProducts.map((product: ProductDisp) => (
              <div key={product.id}>
                <CartItem
                  id={product.id}
                  name={product.name}
                  img={product.img}
                  price={product.price.toString()}
                  amount={product.amount}
                  total={total}
                />
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
      </>
    );
  }
}
