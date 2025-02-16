"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOrders } from "@/services/api";
import type { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        // Fetch all orders )
        const data = await fetchOrders();
        
        // Find the order that matches the given ID
        const foundOrder = data.find((order: Order) => order.id === id);
        if (!foundOrder) throw new Error("Order not found");

        setOrder(foundOrder);
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

  // Handle loading and error states
  if (loading)
    return <p className="text-center py-4 text-lg font-semibold text-gray-700">Loading...</p>;
  if (error)
    return <p className="text-center py-4 text-lg text-red-500 font-semibold">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-6 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">Order Details</h1>

      <div className="flex flex-wrap items-center gap-4 border-b pb-6">
        <Image 
          src={order!.store_logo} 
          alt={order!.store_name} 
          width={60} 
          height={60} 
          className="rounded-full shadow-md" 
        />
        <div className="flex-1 min-w-[150px] sm:text-left">
          <h2 className="text-xl font-bold text-gray-800">{order!.store_name}</h2>
          <a 
            href={order!.store_url} 
            target="_blank" 
            className="text-indigo-500 font-semibold hover:underline"
          >
            Visit Store →
          </a>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-gray-700">
        <p><span className="font-semibold text-gray-900">Reason:</span> {order!.reason}</p>
        <p><span className="font-semibold text-gray-900">Amount:</span> ${order!.amount.toFixed(2)}</p>
        <p>
          <span className="font-semibold text-gray-900">Status:</span>
          <span 
            className={`ml-2 px-2 py-1 text-sm rounded ${order!.active ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}
          >
            {order!.active ? "Active" : "Inactive"}
          </span>
        </p>
        <p><span className="font-semibold text-gray-900">Decision:</span> {order!.decision || "Not yet decided"}</p>
      </div>

      <h2 className="text-2xl font-bold mt-8 text-gray-900">Items</h2>
      <div className="mt-4 border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full border-collapse min-w-[400px]">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {order!.items.map((item) => (
              <tr key={item.id} className="border-b last:border-none">
                <td className="p-3">{item.name}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right font-semibold">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/"
          className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
