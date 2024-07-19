"use server";
import { createClient } from "@/src/supabase/server";
import Item from "../../components/item";
import { supabase } from "@/src/supabase/supabaseClient";
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
export default async function ItemPage({ params }: { params: { id: string } }) {
  async function checkCart(product_id: string): Promise<number> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user != undefined) {
      let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();
      console.log(data["cart"] as Data);
      console.log(error);
      let amount = 0;
      (data["cart"] as Data).cart.products.map(async (product: Product) => {
        if (product.id == product_id) {
          console.log("Amount in menu: ", product.amount);
          amount = product.amount;
        }
      });
      return amount;
    }
    return 0;
  }
  const { id } = params;
  const { data, error } = await supabase.from("products").select().eq("id", id);
  if (error) {
    console.log("There is some trouble with item. Get next response: ", error);
    return <div>No such item</div>;
  }

  return data.map(async (item: any) => (
    <Item
      key={item.id}
      params={{
        id: item.id,
        name: item.name,
        picSrc: item.img,
        price: item.price,
        description: item.description,
        amount: await checkCart(item.id),
      }}
    />
  ));
}
