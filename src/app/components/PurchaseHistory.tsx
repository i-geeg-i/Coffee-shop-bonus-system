"use client";

import React from "react";
import Purchase from "./Purchase";

interface Item {
  [key: string]: number;
}


interface Purchase {
  id: number;
  items: Item[];
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
              items={purchase.items}
              date={new Date(purchase.date)}
              status={purchase.status}
            />
          ))
        )}
      </div>
    </div>
  );
}
