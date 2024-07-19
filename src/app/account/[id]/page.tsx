"use server";
import { supabase } from "@/src/supabase/supabaseClient";
import EditItem from "../../components/EditItem";
import Item from "../../components/item"; // Adjust the path as necessary

export default async function ItemEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, error } = await supabase.from("products").select().eq("id", id);
  if (error) {
    // Handle errors here, e.g., by returning an error page or logging
    console.log(
      "There is some trouble with item. Get next response: ",
        (error)
    );
    return <div>No such item</div>;
  }
  // console.log(data["id"]);
  return data.map((item: any) => (
    <EditItem key={item.id}
      item={{
        id: item.id,
        name: item.name,
        picSrc: item.img,
        price: item.price,
        description: item.description,
      }}
    />
  ));
}