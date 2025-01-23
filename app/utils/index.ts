import { v4 } from "uuid"
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Restaurant, Tag } from "@prisma/client";

const spanFuncMapping: Record<string, (date:  Date) => Date> = {
  'today': (date: Date) => {
    const newDate = new Date(date);

    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  },
  'weekly': (date: Date) => {
    const newDate = new Date(date);

    for (let i = 0; i < 7; i++) {
      newDate.setDate(newDate.getDate() - 1);
    }
    return newDate;
  },
  'monthly': (date: Date) => {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  },
  'semiAnnual': (date: Date) => {
    const newDate = new Date(date);

    for (let i = 0; i < 6; i++) {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    return newDate;
  },
  'annual': (date: Date) => {
    const newDate = new Date(date);

    newDate.setFullYear(newDate.getFullYear() - 1);
    return newDate;
  }
}

const spanLabelFuncMapping: Record<string, (prevDate: Date, originalDate: Date, nextDate: Date) => string> = {
  'today': (prevDate: Date, originalDate: Date, ) => {
    if (Math.floor(((new Date()).getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)) < 1) {
      return 'Today';
    }
    if (Math.floor((originalDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)) <= 1) {
      return 'Yesterday';
    }
    return prevDate.toLocaleDateString();
  },
  'weekly': (prevDate: Date, originalDate: Date, nextDate: Date) => {
    if (Math.floor(((new Date()).getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)) < 7) {
      return 'This week';
    }
    if (Math.floor((originalDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)) <= 7) {
      return 'Last week';
    }
    return prevDate.toDateString().concat(' - '.concat(nextDate.toDateString()));
  },
  'monthly': (prevDate: Date, originalDate: Date) => {
    if (Math.floor(((new Date()).getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) < 1) {
      return 'This month';
    }
    if (Math.floor((originalDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) <= 1) {
      return 'Last month';
    }
    return prevDate.toLocaleString('default', { month: 'long' })
  },
  'semiAnnual': (prevDate: Date, originalDate: Date, nextDate: Date) => {
    if (Math.floor(((new Date()).getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) < 6) {
      return 'This half year';
    }
    if (Math.floor((originalDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) <= 6) {
      return 'Last half year';
    }
    return prevDate.toLocaleDateString().concat(' - '.concat(nextDate.toLocaleDateString()));
  },
  'annual': (prevDate: Date, originalDate: Date) => {
    if (Math.floor(((new Date()).getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) < 12) {
      return 'This year';
    }
    if (Math.floor((originalDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) <= 12) {
      return 'Last year';
    }
    return prevDate.getFullYear().toString();
  }
}

export async function generateAuthToken(email: string) {
  const dbUser = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!dbUser) {
    return '';
  }

  await prisma.authToken.deleteMany({
    where: {
      email
    }
  });

  const uuid = v4();
  // Set the expiration date to 3 hours after creation
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 3);

  const token = await prisma.authToken.create({
    data: {
      email,
      token: uuid,
      expiresAt
    }
  });
  return uuid;
}

export async function validateAuthToken(token: string) {
  try {
    const authToken = await prisma.authToken.findFirst({
      where: {
        token
      }
    });
  
    if (authToken) {
      const currentTime = new Date();
  
      if (authToken.expiresAt > currentTime) {
        const user = await prisma.user.findFirst({
          where: {
            email: authToken.email
          }
        });
  
        if (user) {
          await prisma.user.update({
            where: {
              email: user.email
            },
            data: {
              verified: true,
            }
          });
  
          return true;
        }
      }

      await prisma.authToken.delete({
        where: {
          id: authToken.id
        }
      });
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function getSpanDate(span: string) {
  const date = new Date();

  if (span === 'today') {
    date.setHours(0, 0, 0, 0);
  } else if (span === 'weekly') {
    date.setDate(date.getDate() - date.getDay());
    date.setHours(0, 0, 0, 0);
  } else if (span === 'monthly') {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  } else if (span === 'semiAnnual') {
    if (date.getMonth() > 6) {
      date.setMonth(6, 1);
    } else {
      date.setMonth(0, 1);
    }
    date.setHours(0, 0, 0, 0);
  } else if (span === 'annual') {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  } else if (span === 'allTime') {
    date.setFullYear(2023, 0, 1);
    date.setHours(0, 0, 0, 0);
  }

  return date;
}

export async function verifyManager(restaurantId: string) {
  const session = await getServerSession(options);
  if (session) {
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
        managerId: session.user.user.Manager?.id
      }
    });

    if (restaurant) {
      return restaurant;
    }
  }
  return undefined;
}

export async function generateAnalytics(restaurantId: string, span: string) {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/login');
  }

  if (restaurantId) {
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        managerId: session.user.user.Manager?.id
      },
      include: {
        orders: true
      }
    });

    if (!restaurant) {
      return {
        message: "Couldn't find the specified restaurant"
      }
    }

    const tags = [];
    const dishTags = [];
    const dishNames = [];

    for (let order of restaurant.orders) {
      for (let tag of order.tags) {
        tags.push(tag);
      }

      for (let dish of order.dishes) {
        dishNames.push(dish.dish.name);
        for (let tag of dish.dish.tags) {
          dishTags.push(tag);
        }
      }
    }

    const result = await getTotalSales(restaurantId, span);
    const customerRating = getCustomerRating(restaurant);
    const latestCustomerReview = await getLatestCustomerReview(restaurant);
    const latestOrder = await getLatestOrder(restaurantId, span);
    const mostOrderedDishes= await getMostOrderedDishes(restaurantId, span);
    const leastOrderedDishes = await getLeastOrderedDishes(restaurantId, span);
    const mostOrderedCategories = await getMostOrderedCategories(restaurantId, span);
    const leastOrderedCategories = await getLeastOrderedCategories(restaurantId, span);

    return {
      result,
      customerRating,
      latestCustomerReview,
      latestOrder,
      mostOrderedDishes,
      leastOrderedDishes,
      mostOrderedCategories,
      leastOrderedCategories
    }
  }

  return {
    someRandomShit: 'Hello',
    user: session.user.user
  }
  // if (!session) {
  //   redirect('/login');
  // }
  // if (restaurantId !== '0') {
  //   const restaurant = await prisma.restaurant.findFirst({
  //     where: {
  //       managerId: session.user.user.id,
  //       id: restaurantId
  //     }
  //   });
  //   if (!restaurant) {
  //     return {
  //       message: 'No restaurant found'
  //     }
  //   }
  //   console.log(await getTotalSales(restaurant.id, 'today'))
    // return {
    //   totalSales: getTotalSales(restaurant, span),
    //   totalOrders: getTotalOrders(restaurant, span),
    //   completedOrders: getCompletedOrders(restaurant, span),
    //   customerRating: getCustomerRating(restaurant, span),
    //   latestCustomerReview: getLatestCustomerReview(restaurantId);
    //   latestOrder: getLatestOrder(restaurant, span),
    //   mostOrdered: getMostOrdered(restaurant, span),
    //   leastOrdered: getLeastOrdered(restaurant, span),
    //   mostOrderedCategory: getMostOrderedCategory(restaurant, span),
    //   leastOrderedCategory: getLeastOrderedCategory(restaurant, span)
    // }
  // }
}

export async function getSalesHistory(restaurantId: string, span: string, date: Date) {
  const originalDate = new Date(date);
  const history = [];

  for (let i = 0; i < 5; i++) {
    const newDate = spanFuncMapping[span](date);
    const orders = await prisma.order.findMany({
      where: {
        restaurantId,
        createdAt: {
          gte: newDate,
          lt: date
        },
        madeRestaurantConfirm: true,
        madeDriverConfirm: true
      }
    });
    let totalSales = 0;
    for (let order of orders) {
      let orderPrice = 0;
  
      for (let orderDish of order.dishes) {
        orderPrice += (orderDish.quantity * orderDish.dish.price);
      }
      totalSales += orderPrice;
    }
    const dateLabel = spanLabelFuncMapping[span](newDate, originalDate, date);
    history.unshift({
      label: dateLabel,
      value: parseFloat(totalSales.toFixed(2))
    })
    date = newDate;
  }
  return history;
}

export async function getTotalSales(restaurantId: string, span: string) {
  let date = getSpanDate(span);

  const orders = await prisma.order.findMany({
    where: {
      restaurantId,
      createdAt: {
        gte: date
      },
      madeRestaurantConfirm: true,
      madeDriverConfirm: true
    }
  });
  let totalSales = 0;
  for (let order of orders) {
    let orderPrice = 0;

    for (let orderDish of order.dishes) {
      orderPrice += (orderDish.quantity * orderDish.dish.price);
    }
    totalSales += orderPrice;
  }
  let firstEntry = totalSales.toFixed(2);
  if (span === 'allTime') {
    date = getSpanDate('annual');
    span = 'annual';
    firstEntry = (await getTotalSales(restaurantId, span)).totalSales;
  }
  const history = await getSalesHistory(restaurantId, span, date);
  const dateLabel = spanLabelFuncMapping[span](date, date, date);
  history.push({
    label: dateLabel,
    value: parseFloat(firstEntry)
  });

  return {
    totalSales: totalSales.toFixed(2),
    numCompletedOrders: orders.length,
    history
  };
}

export async function getOrdersHistory(restaurantId: string, span: string, date: Date) {
  const originalDate = new Date(date);
  const history = [];

  for (let i = 0; i < 5; i++) {
    const newDate = spanFuncMapping[span](date);
    const totalOrdersCount = await prisma.order.count({
      where: {
        restaurantId,
        createdAt: {
          gte: newDate,
          lt: date
        },
      }
    });
    const completedOrdersCount = await prisma.order.count({
      where: {
        restaurantId,
        createdAt: {
          gte: newDate,
          lt: date
        },
        madeRestaurantConfirm: true,
        madeDriverConfirm: true
      }
    });
    const dateLabel = spanLabelFuncMapping[span](newDate, originalDate, date);
    history.unshift({
      label: dateLabel,
      totalOrdersCount,
      completedOrdersCount
    })
    date = newDate;
  }
  return history;
}

export async function getOrdersCount(restaurantId: string, span: string) {
  let date = getSpanDate(span);

  const totalOrdersCount = await prisma.order.count({
    where: {
      restaurantId,
      createdAt: {
        gte: date
      }
    }
  });
  const completedOrdersCount = await prisma.order.count({
    where: {
      restaurantId,
      createdAt: {
        gte: date
      },
      madeRestaurantConfirm: true,
      madeDriverConfirm: true
    }
  });
  let firstEntry = { totalOrdersCount, completedOrdersCount };
  if (span === 'allTime') {
    date = getSpanDate('annual');
    span = 'annual';
    const { totalOrdersCount, completedOrdersCount } = (await getOrdersCount(restaurantId, span));
    firstEntry = { totalOrdersCount, completedOrdersCount };
  }
  const history = await getOrdersHistory(restaurantId, span, date);
  const dateLabel = spanLabelFuncMapping[span](date, date, date);
  history.push({
    label: dateLabel,
    ...firstEntry
  });

  return {
    totalOrdersCount,
    completedOrdersCount,
    history
  };
}

export function getCustomerRating(restaurant: Restaurant) {
  return parseFloat((restaurant.rating.totalRating / restaurant.rating.numRating).toFixed(1));
}

export async function getLatestCustomerReview(restaurant: Restaurant) {
  const latestReview = restaurant.reviews.at(-1)
  if (latestReview) {
    const { customerId, comment, createdAt } = latestReview;

    const customer = await prisma.customer.findFirst({
      where: {
        id: customerId
      },
      include: {
        user: true
      },
    });

    if (!customer) {
      return null;
    }

    return {
      firstName: customer.user.firstName,
      lastName: customer.user.lastName,
      comment,
      createdAt
    }
  }

  return null;
}

export async function getLatestOrder(restaurantId: string, span: string) {
  const date = getSpanDate(span);

  const order = await prisma.order.findFirst({
    where: {
      restaurantId,
      createdAt: {
        gte: date
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return order;
}

export async function getMostOrderedDishes(restaurantId: string, span: string) {
  const date = getSpanDate(span);

  const value = await prisma.order.aggregateRaw({
    pipeline: [
      { $match: { restaurantId: { '$oid': restaurantId } } },
      {
        $match: {
          $expr: {
            $gte: [
              "$createdAt",
              {
                $dateFromString: {
                  dateString: date.toISOString(),
                },
              },
            ],
          },
        },
      },
      { $unwind: '$dishes' },
      { $group: { _id: '$dishes.dish.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ],
  })

  return value;
}

export async function getLeastOrderedDishes(restaurantId: string, span: string) {
  const date = getSpanDate(span);

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: restaurantId
    }
  });

  if (restaurant) {
    const allDishes = restaurant.dishes;
    const dishesFrequency: Record<string, number> = {};

    for (let dish of allDishes) {
      dishesFrequency[dish.name] = 0;
    }

    const value: any = await prisma.order.aggregateRaw({
      pipeline: [
        { $match: { restaurantId: { '$oid': restaurantId } } },
        {
          $match: {
            $expr: {
              $gte: [
                "$createdAt",
                {
                  $dateFromString: {
                    dateString: date.toISOString(),
                  },
                },
              ],
            },
          },
        },
        { $unwind: '$dishes' },
        { $group: { _id: '$dishes.dish.name', count: { $sum: 1 } } },
        { $sort: { count: 1 } },
      ]
    });
  
    for (let dish of value) {
      dishesFrequency[dish._id] = dish.count;
    }
    const sortable = [];
    for (let dish in dishesFrequency) {
      sortable.push([dish, dishesFrequency[dish]]);
    }

    sortable.sort((dish1, dish2) => (dish1[1] as number) - (dish2[1] as number))
  
    const sortedDishesFrequency = [];

    for (let dishFrequency of sortable.slice(0, 3)) {
      sortedDishesFrequency.push({
        _id: dishFrequency[0],
        count: dishFrequency[1]
      });
    }
    return sortedDishesFrequency;
  }
}

export async function getMostOrderedCategories(restaurantId: string, span: string) {
  const date = getSpanDate(span);

  const value = await prisma.order.aggregateRaw({
    pipeline: [
      { $match: { restaurantId: { '$oid': restaurantId } } },
      {
        $match: {
          $expr: {
            $gte: [
              "$createdAt",
              {
                $dateFromString: {
                  dateString: date.toISOString(),
                },
              },
            ],
          },
        },
      },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]
  });

  return value;
}

export async function getLeastOrderedCategories(restaurantId: string, span: string) {
  const date = getSpanDate(span);

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: restaurantId
    }
  });

  if (restaurant) {
    const tagsFrequency: Record<Tag | any, number> = {};

    for (let dish of restaurant.dishes) {
      for (let tag of dish.tags) tagsFrequency[tag] = 0;
    }

    const value: any = await prisma.order.aggregateRaw({
      pipeline: [
        { $match: { restaurantId: { '$oid': restaurantId } } },
        {
          $match: {
            $expr: {
              $gte: [
                "$createdAt",
                {
                  $dateFromString: {
                    dateString: date.toISOString(),
                  },
                },
              ],
            },
          },
        },
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: 1 } },
      ]
    });

    for (let tag of value) {
      tagsFrequency[tag._id] = tag.count;
    }
    const sortable = [];
    for (let tag in tagsFrequency) {
      sortable.push([tag, tagsFrequency[tag]]);
    }

    sortable.sort((tag1, tag2) => (tag1[1] as number) - (tag2[1] as number))
  
    const sortedTagsFrequency = [];

    for (let tagFrequency of sortable.slice(0, 3)) {
      sortedTagsFrequency.push({
        _id: tagFrequency[0],
        count: tagFrequency[1]
      });
    }
    return sortedTagsFrequency;
  }
}

export async function getManagerRestaurants() {
  const session = await getServerSession(options);

  if (!session) {
    return [];
  }

  const restaurants = await prisma.restaurant.findMany({
    where: {
      managerId: session.user.user.Manager.id,
    },
    select: {
      id: true,
      name: true,
      image: true,

    }
  });
  return restaurants
}
