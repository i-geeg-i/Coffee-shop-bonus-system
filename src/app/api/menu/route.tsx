import * as db from "../db_worker";

export async function GET() {
  let products = await db.getMenu();
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}
