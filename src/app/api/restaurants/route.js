import { Restaurant } from '@/lib/db';
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'name';
    const location = searchParams.get('location') || '';
    const cuisine = searchParams.get('cuisine') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 7; // Changed to 7

    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (cuisine) query.cuisine = { $regex: cuisine, $options: 'i' };

    const sortObj = sort.startsWith('-') ? { [sort.slice(1)]: -1 } : { [sort]: 1 };

    const restaurants = await Restaurant.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Restaurant.countDocuments(query);

    return NextResponse.json({ restaurants, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/restaurants:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}