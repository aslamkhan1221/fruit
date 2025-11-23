import { NextResponse } from 'next/server';
import { openDb } from '@/database/db';

// In-memory storage for Vercel/Serverless fallback
let MOCK_PLANS: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, duration, goal, plan_data } = body;
    
    try {
      const db = await openDb();
      const result = await db.run(
        'INSERT INTO diet_plans (name, duration, goal, plan_data) VALUES (?, ?, ?, ?)',
        [name, duration, goal, JSON.stringify(plan_data)]
      );
      return NextResponse.json({ success: true, id: result.lastID });
    } catch (dbError) {
      console.warn('Database write failed, using in-memory storage:', dbError);
      const newPlan = {
        id: Date.now(),
        name,
        duration,
        goal,
        plan_data: JSON.stringify(plan_data),
        created_at: new Date().toISOString()
      };
      MOCK_PLANS.push(newPlan);
      return NextResponse.json({ success: true, id: newPlan.id });
    }
  } catch (error) {
    console.error('Failed to save diet plan:', error);
    return NextResponse.json({ error: 'Failed to save diet plan' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, plan_data } = body;
    
    try {
      const db = await openDb();
      await db.run(
        'UPDATE diet_plans SET plan_data = ? WHERE id = ?',
        [JSON.stringify(plan_data), id]
      );
      return NextResponse.json({ success: true });
    } catch (dbError) {
       console.warn('Database update failed, using in-memory storage:', dbError);
       const planIndex = MOCK_PLANS.findIndex(p => p.id === id);
       if (planIndex !== -1) {
         MOCK_PLANS[planIndex].plan_data = JSON.stringify(plan_data);
         return NextResponse.json({ success: true });
       }
       return NextResponse.json({ error: 'Plan not found in memory' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to update diet plan:', error);
    return NextResponse.json({ error: 'Failed to update diet plan' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const db = await openDb();
        const plans = await db.all('SELECT * FROM diet_plans ORDER BY created_at DESC');
        const parsedPlans = plans.map((plan: any) => ({
            ...plan,
            plan_data: JSON.parse(plan.plan_data)
        }));
        return NextResponse.json(parsedPlans);
    } catch (error) {
        console.warn('Database read failed, using in-memory storage:', error);
        const parsedPlans = MOCK_PLANS.map((plan: any) => ({
            ...plan,
            plan_data: JSON.parse(plan.plan_data)
        }));
        return NextResponse.json(parsedPlans);
    }
}
