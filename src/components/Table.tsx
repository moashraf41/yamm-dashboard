"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/features/store";
import { useEffect, useState } from "react";
import { getOrders } from "@/features/ordersSlice";
import TableRow from "./TableRow";

const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error, ordersPerPage } = useSelector((state: RootState) => state.orders);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDecision, setFilterDecision] = useState("all");

  // Fetch orders when the component mounts
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Show loading state
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-sky-500 border-solid"></div>
        <p className="ml-3 text-lg font-semibold text-sky-600">Loading, please wait...</p>
      </div>
    );
  
  // Show error state
  if (error)
    return (
      <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center">
        <span className="text-xl mr-2">❌</span>
        <p className="font-semibold">{error}</p>
      </div>
    );
  
  // Filter orders based on search, status, and decision
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || (filterStatus === "active" && order.active) || (filterStatus === "inactive" && !order.active);

    const matchesDecision =
      filterDecision === "all" || order.decision === filterDecision;

    return matchesSearch && matchesStatus && matchesDecision;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = page * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="shadow-lg rounded-lg border border-gray-200 bg-white">
      <div className="p-4 bg-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by store name or reason..."
          className="p-2 border rounded w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />

        <div className="relative w-full md:w-1/4">
          <select
            className="w-full p-2 border rounded-lg bg-white shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">📌 All Status</option>
            <option value="active">✅ Active</option>
            <option value="inactive">❌ Inactive</option>
          </select>
          <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">▼</span>
        </div>

        <div className="relative w-full md:w-1/4">
          <select
            className="w-full p-2 border rounded-lg bg-white shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={filterDecision}
            onChange={(e) => {
              setFilterDecision(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">📌 All Decisions</option>
            <option value="accept">✔️ Accepted</option>
            <option value="reject">❌ Rejected</option>
            <option value="escalate">⚠️ Escalated</option>
          </select>
          <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">▼</span>
        </div>
      </div>

      <div className="table-container">
        <table className="w-full border-collapse min-w-[900px]">
          <thead className="bg-blue-600 text-white shadow-md">
            <tr>
              <th className="p-4 text-sm font-semibold">Store</th>
              <th className="p-4 text-sm font-semibold">Reason</th>
              <th className="p-4 text-sm font-semibold">Amount</th>
              <th className="p-4 text-sm font-semibold">Items</th>
              <th className="p-4 text-sm font-semibold">Active</th>
              <th className="p-4 text-sm font-semibold">Decision</th>
              <th className="p-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <TableRow key={order.id} order={order} isEven={index % 2 === 0} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">No matching orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 bg-gray-100">
        <button
          className={`px-4 py-2 sm:w-auto w-full rounded ${page === 1 || filteredOrders.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1 || filteredOrders.length === 0}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium text-center sm:w-auto w-full">
          Page {filteredOrders.length > 0 ? page : 0} of {filteredOrders.length > 0 ? totalPages : 0}
        </span>

        <button
          className={`px-4 py-2 sm:w-auto w-full rounded ${page === totalPages || filteredOrders.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || filteredOrders.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
