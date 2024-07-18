"use server";
import Item from "../../components/item"; // Adjust the path as necessary

export default async function ItemPage({ params }: { params: { id: string } }) {
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
    data.map(((item: any) => (
        <Item
        params={{
          id: item.id,
          name: item.name,
          picSrc: item.img,
          price: item.price,
          description: item.description,
        }}
      />
    ))
  ));
}
