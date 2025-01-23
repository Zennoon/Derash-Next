import prisma from "@/prisma/client";
import { OrderDish } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();

  for (let i = 0; i < 10; i++) {
    const restaurant = restaurants[Math.floor(Math.random() * (restaurants.length - 1))];
    console.log(restaurant, restaurant.dishes);
    const orderDishes: OrderDish[] = [];

    for (let j = 0; j < 1 + (Math.random() * 4); j++) {
      orderDishes.push({
        dish: restaurant.dishes[Math.floor(Math.random() * (restaurant.dishes.length - 1))],
        quantity: 1 + Math.floor(Math.random() * 5)
      });
    }
    console.log(orderDishes);
  }

  return NextResponse.json({
    message: 'Successful'
  })
}
