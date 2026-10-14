import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    engine: 'DEZO Growth Engine (Next.js App Router)',
  });
}
