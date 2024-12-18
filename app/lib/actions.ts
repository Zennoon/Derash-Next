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
}

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  const validationFields = UserSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    phoneNum: formData.get('phoneNum')
  });

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to register customer'
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
      errors: {},
      message: 'The email is already registered.',
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
      message: ''
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
