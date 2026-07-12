import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, items, total } = body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would typically save to Supabase
    // For now, we just return success
    return NextResponse.json({
      success: true,
      message: 'Order received',
      orderId: `ORD-${Date.now()}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
