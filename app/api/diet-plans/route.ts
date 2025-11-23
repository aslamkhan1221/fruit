import { NextResponse } from 'next/server';
import { openDb } from '@/database/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, duration, goal, plan_data } = body;
    
    const db = await openDb();
    const result = await db.run(
      'INSERT INTO diet_plans (name, duration, goal, plan_data) VALUES (?, ?, ?, ?)',
      [name, duration, goal, JSON.stringify(plan_data)]
    );

    return NextResponse.json({ success: true, id: result.lastID });
  } catch (error) {
    console.error('Failed to save diet plan:', error);
    return NextResponse.json({ error: 'Failed to save diet plan' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, plan_data } = body;
    
    const db = await openDb();
    await db.run(
      'UPDATE diet_plans SET plan_data = ? WHERE id = ?',
      [JSON.stringify(plan_data), id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update diet plan:', error);
    return NextResponse.json({ error: 'Failed to update diet plan' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const db = await openDb();
        const plans = await db.all('SELECT * FROM diet_plans ORDER BY created_at DESC');
        // Parse the JSON string back to object
        const parsedPlans = plans.map((plan: any) => ({
            ...plan,
            plan_data: JSON.parse(plan.plan_data)
        }));
        return NextResponse.json(parsedPlans);
    } catch (error) {
        console.error('Failed to fetch diet plans:', error);
        return NextResponse.json({ error: 'Failed to fetch diet plans' }, { status: 500 });
    }
}
