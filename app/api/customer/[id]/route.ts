import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const customerId = url.pathname.split('/').at(-1);

  if (customerId) {
    try {
      const customer = await prisma.customer.findUniqueOrThrow({
        where: {
          id: customerId,
        },
        include: {
          user: true,
        }
      });
      return NextResponse.json(customer);
    } catch (error) {
      return NextResponse.json({
          message: "Couldn't find a customer with that ID",
          error
        }, { status: 404 }
      );
    }
  }
  return NextResponse.json({
    message: 'Please provide a customerId',
  }, { status: 400 })
}
