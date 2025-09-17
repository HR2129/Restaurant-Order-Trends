// import { Order } from '@/lib/db';
// import { Restaurant } from '@/lib/db';
// import { NextResponse } from 'next/server';
// import { parseISO } from 'date-fns';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const start_date = searchParams.get('start_date') ? parseISO(searchParams.get('start_date')) : new Date(0);
//   const end_date = searchParams.get('end_date') ? parseISO(searchParams.get('end_date')) : new Date();
//   const min_amount = parseFloat(searchParams.get('min_amount')) || 0;
//   const max_amount = parseFloat(searchParams.get('max_amount')) || Infinity;
//   const min_hour = parseInt(searchParams.get('min_hour')) || 0;
//   const max_hour = parseInt(searchParams.get('max_hour')) || 23;
//   const restaurant_ids = searchParams.get('restaurant_ids') ? searchParams.get('restaurant_ids').split(',').map(Number) : null;

//   const match = {
//     order_time: { $gte: start_date, $lte: end_date },
//     order_amount: { $gte: min_amount, $lte: max_amount },
//     $expr: {
//       $and: [
//         { $gte: [{ $hour: '$order_time' }, min_hour] },
//         { $lte: [{ $hour: '$order_time' }, max_hour] },
//       ],
//     },
//   };
//   if (restaurant_ids) match.restaurant_id = { $in: restaurant_ids };

//   const top = await Order.aggregate([
//     { $match: match },
//     {
//       $group: {
//         _id: '$restaurant_id',
//         revenue: { $sum: '$order_amount' },
//       },
//     },
//     { $sort: { revenue: -1 } },
//     { $limit: 3 },
//   ]);

//   // Join with restaurant names
//   const topWithNames = await Promise.all(
//     top.map(async (item) => {
//       const restaurant = await Restaurant.findOne({ id: item._id });
//       return { ...item, name: restaurant?.name || 'Unknown' };
//     })
//   );

//   return NextResponse.json(topWithNames);
// }

import { Restaurant, Order } from '@/lib/db';
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date') || '2025-01-01';
    const endDate = searchParams.get('end_date') || new Date().toISOString().split('T')[0];

    // Aggregate orders to get total revenue per restaurant
    const topRestaurants = await Order.aggregate([
      {
        $match: {
          order_time: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: '$restaurant_id',
          totalRevenue: { $sum: '$order_amount' },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 3,
      },
      {
        $lookup: {
          from: 'restaurants',
          localField: '_id',
          foreignField: 'id',
          as: 'restaurant',
        },
      },
      {
        $unwind: '$restaurant',
      },
      {
        $project: {
          id: '$restaurant.id',
          name: '$restaurant.name',
          location: '$restaurant.location',
          cuisine: '$restaurant.cuisine',
          totalRevenue: 1,
        },
      },
    ]);

    return NextResponse.json({ restaurants: topRestaurants }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/restaurants/top:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}