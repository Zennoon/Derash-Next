import { z } from "zod";
import { isMobilePhone } from 'validator';

const validateLicenseNum = function (licenseNum: string) {
  return ['A', 'B', 'C'].includes(licenseNum[0]) && !isNaN(Number(licenseNum.slice(1)))
}

export const UserSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Please input a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  phoneNum: z.string().refine(isMobilePhone, 'Please input a valid phone number.'),
  profilePic: z.string().optional()
});

export const DriverSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Please input a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  phoneNum: z.string().refine(isMobilePhone, 'Please input a valid phone number.'),
  licenseNum: z.string().length(6, 'Please provide a valid license number.').refine(validateLicenseNum),
  carDescription: z.string().optional(),
  profilePic: z.string().optional()
})
