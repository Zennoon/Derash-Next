'use server';
import prisma from '@/prisma/client';
import bcrypt from 'bcrypt';
import { UserSchema } from "./schemas";
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
import { generateAuthToken } from '../utils';
import AuthToken from '@/components/emails/AuthTokenTemplate';

const resend = new Resend(process.env['RESEND_API_KEY']);

export type CustomerState = {
  errors?: {
    firstName?: string[] | undefined,
    lastName?: string[] | undefined,
    email?: string[] | undefined,
    password?: string[] | undefined,
    phoneNum?: string[] | undefined,
    profilePic?: string[] | undefined
  };
  message?: string | null;
  values?: {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phoneNum: string | undefined;
  }
}

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  const values = {
    firstName: formData.get('firstName')?.toString(),
    lastName: formData.get('lastName')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    phoneNum: formData.get('phoneNum')?.toString()
  }
  const validationFields = UserSchema.safeParse(values);

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to register customer',
      values
    }
  }
  const { firstName, lastName, email, password, phoneNum } = validationFields.data;
  
  const existingUser = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (existingUser) {
    return {
      errors: {
        email: ['This email is already registered.']
      },
      message: 'The email is already registered.',
      values
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNum
      }
    });

    const customer = await prisma.customer.create({
      data: {
        userId: user.id,
      }
    })
  } catch (error) {
    return {
      errors: {},
      message: '',
      values
    }
  }
  redirect('/');
}

export async function sendAuthEmail(email: string) {
  const token = await generateAuthToken(email);

  if (!token) {
    return null;
  }
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Authenticate your Derash Account',
      react: AuthToken(token)
    });
  } catch (error) {
    return null;
  }
}
