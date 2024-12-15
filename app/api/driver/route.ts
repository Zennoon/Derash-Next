import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { DriverSchema } from "@/app/lib/schemas";

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  const validationFields = DriverSchema.safeParse(data);
  if (!validationFields.success) {
    return NextResponse.json({
      errors: validationFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create driver',
    }, { status: 400 });
  }
  const  { firstName, lastName, email, password, phoneNum, licenseNum, carDescription, profilePic } = validationFields.data;

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
    const driver = await prisma.driver.create({
      data: {
        userId: user.id,
        licenseNum,
        carDescription,
        rating: {
          totalRating: 5,
          numRating: 1
        }
      }
    });
    return NextResponse.json(driver, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error was encountered. Failed to create driver',
        error
      },
      { status: 500 });
  }
}
