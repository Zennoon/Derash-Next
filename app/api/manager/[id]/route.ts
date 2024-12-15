import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const managerId = url.pathname.split('/').at(-1);

  if (managerId) {
    try {
      const manager = await prisma.manager.findUniqueOrThrow({
        where: {
          id: managerId,
        },
        include: {
          user: true,
        }
      });
      return NextResponse.json(manager);
    } catch (error) {
      return NextResponse.json({
          message: "Couldn't find a manager with that ID",
          error
        }, { status: 404 }
      );
    }
  }
  return NextResponse.json({
    message: 'Please provide a managerId',
  }, { status: 400 })
}
