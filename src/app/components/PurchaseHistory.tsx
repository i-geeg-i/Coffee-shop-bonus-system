'use client'
import { UUID } from "crypto";
import Purchase from "./Purchase";
import { supabase } from "@/src/supabase/supabaseClient";

interface Purchase {
  id: number;
  items: number[];
  date: Date;
  status: string;
  user_id: UUID;
}

interface PurchaseHistoryProps {
  purchases: Purchase[];
}

export default function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
  return (
    <div className="">
      {purchases.map(purchase => (
        <Purchase
          key={purchase.id}
          id={purchase.id}
          itemsIds={purchase.items}
          date={purchase.date}
          status={purchase.status}
          user_id={purchase.user_id}
        />
      ))}
    </div>
  );
}
