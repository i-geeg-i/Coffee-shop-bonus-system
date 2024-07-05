import * as db from '../db_worker';
export async function GET(){
    let products : string[]  = await db.getMenu() as string[];
    return Response.json({products});
}