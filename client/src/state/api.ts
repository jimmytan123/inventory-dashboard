import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

// Define the response type of the Dashboard metrics
export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['DashboardMetrics', 'Products', 'Users'],
  endpoints: (build) => ({
    /* 
      DashboardMetrics: This is the expected type for the data returned by the query.
      void: This represents the argument type that getDashboardMetrics accepts. 
    */
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => '/dashboard',
      providesTags: ['DashboardMetrics'],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (searchQuery) => ({
        url: '/products',
        params: searchQuery ? { search: searchQuery } : {},
      }),
      providesTags: ['Products'],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'], // Update products everytime we create a new product
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
} = api;
