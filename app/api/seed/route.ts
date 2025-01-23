import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import data from '../../lib/seedData.json';
import dates from '../../lib/order_dates.json';
import { Color, Dish, OrderDish, Tag } from "@prisma/client";
import { ObjectId } from "mongodb";

// export async function GET() {
//   try {
//     console.log('Starting...');
//     await prisma.order.deleteMany();
//     await prisma.restaurant.deleteMany();
//     console.log('Deleted existing data...');
//     const { restaurants, dishes } = data;
//     const customer = await prisma.customer.findFirst();
//     const manager = await prisma.manager.findFirst();
//     const driver = await prisma.driver.findFirst()
//     const allTags = [
//       'Vegan',
//       'Vegitarian',
//       'Pescaterian',
//       'Protien',
//       'Dessert',
//       'Main_Course',
//       'Appetizer',
//       'Gluten_Free',
//       'Sea_Food',
//       'Meat',
//       'Non_Dairy',
//       'Dairy',
//     ]
//     let i = 0;

//     for (let restaurant of restaurants) {
//       const { restaurant_name: name, colorScheme, latitude, longitude,  } = restaurant;
//       const restaurantDishes: Dish[] = [];
  
//       for (let j = 0; j < 5; j++) {
//         let m = Math.floor(Math.random() * (allTags.length - 1));
//         let n = m;

//         while (n === m) {
//           n = Math.floor(Math.random() * (allTags.length - 1));
//         }
//         restaurantDishes.push({
//           id: (new ObjectId()).toString(),
//           ...dishes[i],
//           ingredients: [dishes[i].ingredients],
//           tags: [allTags[m] as Tag, allTags[n] as Tag],
//           image: null
//         });
//         i++;
//       }
  
//       const newRestaurant = await prisma.restaurant.create({
//         data: {
//           name,
//           location: {
//             latitude,
//             longitude
//           },
//           rating: {
//             numRating: 1,
//             totalRating: 5
//           },
//           colorScheme: colorScheme as Color,
//           managerId: manager?.id || '',
//           dishes: restaurantDishes,
//           createdAt: new Date('01/20/2023')
//         }
//       });
//       let k = 0;

//       for (let i = 0; i < 250; i++) {
//         const madeRestaurantConfirm = !!(Math.floor(Math.random() * 999) % 2);
//         const madeDriverConfirm = madeRestaurantConfirm ? !!(Math.floor(Math.random() * 999) % 2) : false;
//         const deliveredDriverConfirm = madeDriverConfirm ? !!(Math.floor(Math.random() * 999) % 2) : false;
//         const deliveredCustomerConfirm = deliveredDriverConfirm ? !!(Math.floor(Math.random() * 999) % 2) : false;
//         const orderDishes: OrderDish[] = [];
//         const orderTags: Tag[] = [];
//         let totalPrice = 0;

//         for (let j = 0; j < 1 + (Math.random() * 4); j++) {
//           const dish = newRestaurant.dishes[Math.floor(Math.random() * (newRestaurant.dishes.length - 1))];
//           const quantity = 1 + Math.floor(Math.random() * 4)
//           orderDishes.push({
//             dish,
//             quantity
//           });
//           for (let tag of dish.tags) {
//             if (!orderTags.includes(tag)) orderTags.push(tag);
//           }

//           totalPrice += (quantity * dish.price);
//         }

//         const order = await prisma.order.create({
//           data: {
//             location: {
//               latitude: 10 + (Math.random() * 30),
//               longitude: 10 + (Math.random() * 30)
//             },
//             totalPrice,
//             customerId: customer?.id || '',
//             restaurantId: newRestaurant.id,
//             driverId: driver?.id || '',
//             madeRestaurantConfirm,
//             madeDriverConfirm,
//             deliveredCustomerConfirm,
//             deliveredDriverConfirm,
//             dishes: orderDishes,
//             tags: orderTags,
//             createdAt: new Date(dates[k].createdAt)
//           }
//         });
//         console.log(k);
//         k += 1;
//         if (k === 250) {
//           k = 0;
//         }
//       }
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.stack)
//     }
//   }
//   return NextResponse.json({
//     message: 'Successful'
//   })
// }

export async function GET(request: NextRequest) {
  const rId = request.nextUrl.searchParams.get('rId');
  const cId = request.nextUrl.searchParams.get('cId');

  await prisma.restaurant.update({
    where: {
      id: rId || ''
    },
    data: {
      reviews: {
        push: {
          customerId: cId || '',
          comment: 'The food here stinks!!! 🤢'
        }
      }
    }
  });

  return NextResponse.json({
    message: 'Successful'
  });
}
