'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { v4 } from 'uuid';
import Header from '../(components)/Header';

type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
}

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: '',
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCreate(formData);

    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === 'price' || name === 'stockQuantity' || name === 'rating'
          ? parseFloat(value)
          : value,
    });
  };

  const labelCssStyles = 'block text-sm font-medium text-gray-700';
  const inputCssStyles =
    'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form onSubmit={handleSumbit} className="mt-5">
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            className={inputCssStyles}
            name="name"
            id="productName"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />

          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            className={inputCssStyles}
            name="price"
            id="productPrice"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            required
          />

          <label htmlFor="productStockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            className={inputCssStyles}
            name="stockQuantity"
            id="productStockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            required
          />

          <label htmlFor="productRating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            className={inputCssStyles}
            name="rating"
            id="productRating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            required
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
