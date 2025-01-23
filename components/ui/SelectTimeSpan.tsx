'use client'

import { timeSpans } from '@/app/lib/constants'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from './select'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const SelectTimeSpan = ({ searchParams }: {
  searchParams: Record<string, string>
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleChange = (span: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('span', span);
    router.push(`${pathname}?${params.toString()}`);
  }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a time span..." />
      </SelectTrigger>
      <SelectContent>
        { timeSpans.map((span) => (
          <SelectItem key={span.queryKey} value={ span.queryKey }>{ span.label }</SelectItem>
        )) }
      </SelectContent>
  </Select>
  )
}

export default SelectTimeSpan