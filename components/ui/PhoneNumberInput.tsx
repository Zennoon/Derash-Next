'use client';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const PhoneNumberInput = ({ id, name, className }: {
  id?: string,
  name?: string,
  className?: string
}) => {
  const [phoneNum, setPhoneNum] = useState('')

  return (
    <PhoneInput
      defaultCountry="et"
      value={phoneNum}
      onChange={(phoneNum) => setPhoneNum(phoneNum)}
      name={name}
      className={className}
    />
  )
}

export default PhoneNumberInput
