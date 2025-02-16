"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import { changeOrderStatus } from "@/features/ordersSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Dropdown from "./Dropdown";
import ToggleSwitch from "./ToggleSwitch";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";


interface Props {
  order: {
    id: string;
    reason: string;
    store_name: string;
    store_logo: string;
    store_url: string;
    amount: number;
    active: boolean;
    decision: string | null;
    items: { name: string; id: string; price: number; quantity: number }[];
  };
  isEven: boolean;
}

const TableRow = ({ order, isEven }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleToggleActive = () => {
    dispatch(changeOrderStatus({ orderId: order.id, isActive: !order.active }));
  };

  return (
    <tr className={`${isEven ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}>
      <td className="p-3 flex items-center gap-2">
  <Image src={order.store_logo} alt={order.store_name} width={30} height={30} className="rounded-full" />
  <a href={order.store_url} target="_blank" className="text-blue-500 hover:underline">
    {order.store_name}
  </a>
</td>
      <td className="p-4 text-gray-700">{order.reason}</td>
      <td className="p-4 font-semibold text-gray-900">${order.amount.toFixed(2)}</td>
      <td className="p-4 text-center font-medium">{order.items.length}</td>
      <td className="p-4">
        <ToggleSwitch isOn={order.active} onToggle={handleToggleActive} />
      </td>
      <td className="p-4">
        <Dropdown orderId={order.id} currentDecision={order.decision} />
      </td>
      <td className="p-4 flex justify-center">
      <Link href={`/orders/${order.id}`} className="text-blue-500 hover:text-blue-700 transition">
  <FaInfoCircle size={20} />
</Link>

      </td>
    </tr>
  );
};

export default TableRow;
