"use server";
import { createClient } from "@/src/supabase/server";
import Item from "../../components/item";
import { supabase } from "@/src/supabase/supabaseClient";
<<<<<<< HEAD
import type { Metadata, ResolvingMetadata } from "next";

=======
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
<<<<<<< HEAD

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = params;
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    console.log("There is some trouble with item. Get next response: ", error);
    return {
      title: "Item not found",
      description: "The item you are looking for does not exist.",
    };
  }

  const item = data;

  return {
    title: `${item.name}`,
    description: item.description,
  };
}

=======
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
<<<<<<< HEAD
      (data["cart"] as Data).cart.products.map((product: Product) => {
=======
      (data["cart"] as Data).cart.products.map(async (product: Product) => {
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
<<<<<<< HEAD
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single();
=======
  const { data, error } = await supabase.from("products").select().eq("id", id);
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
  if (error) {
    console.log("There is some trouble with item. Get next response: ", error);
    return <div>No such item</div>;
  }

<<<<<<< HEAD
  const item = data;

  return (
    <>
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
    </>
  );
=======
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
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
}
