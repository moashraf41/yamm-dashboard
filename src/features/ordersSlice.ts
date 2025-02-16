import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders, updateOrderDecision, toggleOrderStatus } from "@/services/api";
import { Order } from "@/types"; 
import toast from "react-hot-toast";

const initialState = {
  orders: [] as Order[],
  loading: false,
  error: null as string | null,
  currentPage: 1,
  ordersPerPage: 15,
  totalPages: 1,
};

// Fetch all orders from the API
export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  return await fetchOrders();
});

// Update the decision status of an order
export const changeOrderDecision = createAsyncThunk(
  "orders/changeOrderDecision",
  async ({ orderId, decision }: { orderId: string; decision: string }) => {
    const updatedOrder = await updateOrderDecision(orderId, decision);
    toast.success(`Order ${orderId} decision updated to ${decision}`);
    return updatedOrder;
  }
);

// Toggle active/inactive status of an order
export const changeOrderStatus = createAsyncThunk(
  "orders/changeOrderStatus",
  async ({ orderId, isActive }: { orderId: string; isActive: boolean }) => {
    const updatedOrder = await toggleOrderStatus(orderId, isActive);
    toast.success(`Order ${orderId} is now ${isActive ? "Active" : "Inactive"}`);
    return updatedOrder;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalPages = Math.ceil(action.payload.length / state.ordersPerPage);
      })
      .addCase(getOrders.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch orders";
      })
      .addCase(changeOrderDecision.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(changeOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      });
  },
});

export default ordersSlice.reducer;
