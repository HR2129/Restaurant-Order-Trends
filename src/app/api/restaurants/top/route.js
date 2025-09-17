import { Restaurant, Order } from '@/lib/db';
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date') || '2025-01-01';
    const endDate = searchParams.get('end_date') || new Date().toISOString().split('T')[0];

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
