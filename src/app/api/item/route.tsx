import * as db from '../db_worker';
import { headers } from 'next/headers';
import { NextResponse } from "next/server";
export async function GET(){
    const headersList = headers()
    const name = headersList.get('name');
    let item : string  = await db.getItem(name) as string;
    return Response.json({item});
}
export async function POST(request: Request){
    
    const userData = await request.json();
    console.log(userData);
    const name : string = userData['name'];
    const description : string = userData['description'];
    const img : string = userData['img'];
    const price : string = userData['price'];
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
    
    const userData = await request.json();
    console.log(userData);
    const name : string = userData['name'];
    db.deleteItem(name);
    return Response.json(name);
}

export async function PATCH(request: Request) {
    const userData = await request.json();
    console.log(userData);
    const name : string = userData['name'];
    const description : string = userData['description'];
    const img : string = userData['img'];
    const price : string = userData['price'];
    await db.deleteItem(name);
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