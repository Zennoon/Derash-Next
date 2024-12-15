import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const driverId = url.pathname.split('/').at(-1);

  if (driverId) {
    try {
      const driver = await prisma.driver.findUniqueOrThrow({
        where: {
          id: driverId,
        },
        include: {
          user: true,
        }
      });
      return NextResponse.json(driver);
    } catch (error) {
      return NextResponse.json({
          message: "Couldn't find a driver with that ID",
          error
        }, { status: 404 }
      );
    }
  }
  return NextResponse.json({
    message: 'Please provide a driverId',
  }, { status: 400 });
}
