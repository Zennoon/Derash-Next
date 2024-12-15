import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { UserSchema } from "@/app/lib/schemas";

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  const validationFields = UserSchema.safeParse(data);
  if (!validationFields.success) {
    return NextResponse.json({
      errors: validationFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create customer',
    }, { status: 400 });
  }
  const  { firstName, lastName, email, password, phoneNum, profilePic } = validationFields.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    }
  });
  if (existingUser) {
    return NextResponse.json(
      {
        message: 'This email is already registered.'
      }, { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        phoneNum,
        profilePic,
      }
    });
    const customer = await prisma.customer.create({
      data: {
        userId: user.id
      }
    });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error was encountered. Failed to create customer',
        error
      },
      { status: 500 });
  }
}
