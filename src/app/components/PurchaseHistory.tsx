"use client";

import React from "react";
import Purchase from "./Purchase";

interface Purchase {
  id: number;
  items: number[];
  date: Date;
  status: string;
}

interface PurchaseHistoryProps {
  purchases: Purchase[];
}

export default function PurchaseHistory({ purchases }: PurchaseHistoryProps) {
  return (
    <div>
      <h1>History:</h1>
      <div>
        {purchases.length === 0 ? (
          <p>No purchases found.</p>
        ) : (
          purchases.map((purchase) => (
            <Purchase
              key={purchase.id}
              itemsIds={purchase.items}
              date={new Date(purchase.date)}
              status={purchase.status}
            />
          ))
        )}
      </div>
    </div>
  );
}
