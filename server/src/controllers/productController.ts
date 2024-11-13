import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Retrieve the search query params
    const search = req.query.search?.toString();

    // Query Products database with name contains the search query param
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;

    // Create a new item in the Products DB
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};
