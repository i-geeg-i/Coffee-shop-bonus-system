"use server";
import { createClient } from "@/src/supabase/server";
import Item from "../../components/item"; // Adjust the path as necessary
type Product = {
  id : string;
  amount: number;
}
// cart: {[{id:0}], promo: "asd"}
type Data = {
  cart: {
    promo: string;
    products: Product[];
  }
}
export default async function ItemPage({ params }: { params: { id: string } }) {
  async function checkCart(product_id : string): Promise<number>{
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("AXAXAXAAXXAXA");
    if (user!=undefined){
      let { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();
      console.log(data['cart'] as Data);
      console.log(error);
      let amount = 0;
      (data['cart'] as Data).cart.products.map(async (product:Product)=> {
        if (product.id == product_id){
          console.log("Amount in menu: ", product.amount);
          amount = product.amount;
        }
      })
      return amount;
    }
    return 0;
  }
  const { id } = params;
  let res = await fetch(`http://localhost:3000/api/item`, {
    method: "GET",
    headers: new Headers({
      Authorization: "Basic",
      id: id,
    }),
  });
  if (!res.ok) {
    // Handle errors here, e.g., by returning an error page or logging
    console.log(
      "There is some trouble with item. Get next response: " +
        (await res.json()),
    );
    return <div>No such item</div>;
  }
  let data = await res.json();
  console.log(data['id'])
  return(
    data.map((async (item: any) => (
        <Item
        params={{
          id: item.id,
          name: item.name,
          picSrc: item.img,
          price: item.price,
          description: item.description,
          amount: await checkCart(item.id)
        }}
      />
    ))
  ));
}
