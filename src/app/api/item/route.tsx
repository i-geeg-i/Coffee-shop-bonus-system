import * as db from '../db_worker';
import { headers } from 'next/headers';
import { NextResponse } from "next/server";
export async function GET(){
    const headersList = headers()
    const id = headersList.get('id');
    // console.log(id);
    if (id == null){
      return NextResponse.json({
        message: "Specify id"
      }, {
        status: 400,
      })
    }
    let item : string  = await db.getItem(id) as string;
    // console.log(item);
    if (item == undefined){
      return NextResponse.json({
        message: "No such item"
      }, {
        status: 400,
      })
    }
    return NextResponse.json(
      item,
      {
      status: 200,
    })
}
export async function POST(request: Request){
    
    const Data = await request.json();
    // console.log(Data);
    const name : string = Data['name'];
    const description : string = Data['description'];
    const img : string = Data['img'];
    const price : string = Data['price'];
    const resp: boolean = await db.addItem(name, description, img, price) as boolean;
    if (!resp){
        return NextResponse.json({
            message: "Item already exists"
          }, {
            status: 400,
          })
    }
    return NextResponse.json({
        name
      }, {
        status: 200,
      })
}

export async function DELETE(request: Request){
    
  const headersList = headers()
  const id = headersList.get('id');
    db.deleteItem(id);
    return Response.json(id);
}

export async function PATCH(request: Request) {
    const userData = await request.json();
    // console.log(userData);
    const id : string = userData['id'];
    const name : string = userData['name'];
    const description : string = userData['description'];
    const img : string = userData['img'];
    const price : string = userData['price'];
    await db.deleteItem(id);
    const resp: boolean = await db.addItem(name, description, img, price) as boolean;
    if (!resp){
        return NextResponse.json({
            message: "Item already exists"
          }, {
            status: 400,
          })
    }
    return NextResponse.json({
        name
      }, {
        status: 200,
      })
}