'use client'
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter, usePathname } from "next/navigation";

const SelectRestaurant = ({ searchParams, restaurants }: {
  searchParams: Record<string, string>,
  restaurants: any,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleChange = (id: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('rId', id);
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a restaurant..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='0'>All restaurants</SelectItem>
        { restaurants.map((restaurant: any) => (
          <SelectItem key={restaurant.id} value={restaurant.id}>
            <div className="flex w-full flex-row gap-1 justify-start items-center">
              <Image src={restaurant.image || '/restaurant-cartoon.png'} width={20} height={20} alt={restaurant.name} className="rounded-full" />
              <span>{ restaurant.name }</span>
            </div>
          </SelectItem>
        )) }
      </SelectContent>
    </Select>
  )
}

export default SelectRestaurant