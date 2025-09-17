import { Order } from '@/lib/db';
import { NextResponse } from 'next/server';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurant_id = parseInt(searchParams.get('restaurant_id'));
  const start_date = searchParams.get('start_date') ? parseISO(searchParams.get('start_date')) : new Date(0);
  const end_date = searchParams.get('end_date') ? parseISO(searchParams.get('end_date')) : new Date();
  const min_amount = parseFloat(searchParams.get('min_amount')) || 0;
  const max_amount = parseFloat(searchParams.get('max_amount')) || Infinity;
  const min_hour = parseInt(searchParams.get('min_hour')) || 0;
  const max_hour = parseInt(searchParams.get('max_hour')) || 23;

  if (!restaurant_id) return NextResponse.json({ error: 'Missing restaurant_id' }, { status: 400 });

  const match = {
    restaurant_id,
    order_time: { $gte: start_date, $lte: end_date },
    order_amount: { $gte: min_amount, $lte: max_amount },
    $expr: {
      $and: [
        { $gte: [{ $hour: '$order_time' }, min_hour] },
        { $lte: [{ $hour: '$order_time' }, max_hour] },
      ],
    },
  };

  const trends = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$order_time' } },
        orders_count: { $sum: 1 },
        revenue: { $sum: '$order_amount' },
        avg_order_value: { $avg: '$order_amount' },
        hours: { $push: { hour: { $hour: '$order_time' }, count: 1 } },
      },
    },
    {
      $addFields: {
        peak_hour: {
          $arrayElemAt: [
            '$hours.hour',
            { $indexOfArray: ['$hours.count', { $max: '$hours.count' }] },
          ],
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return NextResponse.json(trends);
}
