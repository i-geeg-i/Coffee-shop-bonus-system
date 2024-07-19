"use server";
import { supabase } from "@/src/supabase/supabaseClient";
import EditItem from "../../components/EditItem";

export default async function ItemEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { data, error } = await supabase.from("products").select().eq("id", id);
  if (error) {
    console.log("There is some trouble with item. Get next response: ", error);
    return <div>No such item</div>;
  }
  return data.map((item: any) => (
    <EditItem
      key={item.id}
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
