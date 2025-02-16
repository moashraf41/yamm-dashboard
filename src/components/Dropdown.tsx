"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/features/store";
import { changeOrderDecision } from "@/features/ordersSlice";

interface Props {
  orderId: string;
  currentDecision: string | null;
}

const Dropdown = ({ orderId, currentDecision }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeOrderDecision({ orderId, decision: event.target.value }));
  };

  return (
    <select
      value={currentDecision || "not yet"}
      onChange={handleChange}
      className="border p-2 rounded bg-white"
    >
      <option value="not yet">Not Yet</option>
      <option value="accept">Accept</option>
      <option value="reject">Reject</option>
      <option value="escalate">Escalate</option>
    </select>
  );
};

export default Dropdown;
