"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/features/store";
import { JSX, useEffect, useState } from "react";
import { getOrders } from "@/features/ordersSlice";
import { FaCheckCircle, FaTimesCircle, FaClock, FaShoppingCart, FaList, FaExclamationTriangle } from "react-icons/fa";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector((state: RootState) => state.orders);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(getOrders()).then(() => setIsLoading(false));
  }, [dispatch]);

  // Show a loading message while data is being fetched
  if (loading || isLoading) {
    return <p className="text-center py-10 text-xl font-semibold text-gray-700">Loading statistics...</p>;
  }

  // Calculate order statistics
  const totalOrders = orders.length;
  const activeOrders = orders.filter(order => order.active).length;
  const acceptedOrders = orders.filter(order => order.decision === "accept").length;
  const rejectedOrders = orders.filter(order => order.decision === "reject").length;
  const escalatedOrders = orders.filter(order => order.decision === "escalate").length;
  const notYetOrders = orders.filter(order => order.decision === "not yet").length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Orders" count={totalOrders} icon={<FaShoppingCart />} gradient="from-blue-500 to-blue-700" />
        <StatCard title="Active Orders" count={activeOrders} icon={<FaCheckCircle />} gradient="from-green-500 to-green-700" />
        <StatCard title="Accepted Orders" count={acceptedOrders} icon={<FaList />} gradient="from-teal-500 to-teal-700" />
        <StatCard title="Rejected Orders" count={rejectedOrders} icon={<FaTimesCircle />} gradient="from-red-500 to-red-700" />
        <StatCard title="Not Yet Orders" count={notYetOrders} icon={<FaClock />} gradient="from-orange-500 to-orange-700" />
        <StatCard title="Escalated Orders" count={escalatedOrders} icon={<FaExclamationTriangle />} gradient="from-purple-500 to-purple-700" />
      </div>
    </div>
  );
}

// Reusable statistics card component
const StatCard = ({ title, count, icon, gradient }: { title: string; count: number; icon: JSX.Element; gradient: string }) => {
  return (
    <div className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-xl shadow-lg flex items-center space-x-4 transform hover:scale-105 transition-all duration-300`}>
      <div className="text-4xl">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold">{count}</p>
      </div>
    </div>
  );
};
