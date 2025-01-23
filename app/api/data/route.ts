import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import data from '../../lib/seedData.json';
import { OrderDish } from "@prisma/client";

export async function GET() {
  try {
    const [restaurants, orders] = await Promise.all([
      prisma.restaurant.findMany(),
      prisma.order.findMany({
        include: {
          restaurant: true
        }
      })
    ]);
  
    for (let order of orders) {
      const availableDishes = order.restaurant.dishes;
      const dishes: OrderDish[] = [];
  
      for (let i = 0; i < 1 + (Math.random() * 4); i++) {
        dishes.push({
          dish: availableDishes[Math.floor(Math.random() * (availableDishes.length - 1))],
          quantity: Math.floor(1 + (Math.random() * 4))
        })
      }

      console.log(dishes)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.stack)
    }
  }

  return NextResponse.json({
    message: 'Hello'
  });
}