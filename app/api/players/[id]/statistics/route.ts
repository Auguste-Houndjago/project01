import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST method
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const statistics = await prisma.statistics.create({
      data: {
        ...body,
        playerId: params.id,
      },
    });
    return NextResponse.json(statistics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating statistics' },
      { status: 500 }
    );
  }
}

// GET method
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const statistics = await prisma.statistics.findMany({
      where: { playerId: params.id },
    });
    return NextResponse.json(statistics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching statistics' },
      { status: 500 }
    );
  }
}

// PUT method
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedStatistics = await prisma.statistics.updateMany({
      where: { playerId: params.id },
      data: body,
    });
    return NextResponse.json(updatedStatistics);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating statistics' },
      { status: 500 }
    );
  }
}

// DELETE method
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.statistics.deleteMany({
      where: { playerId: params.id },
    });
    return NextResponse.json({ message: 'Statistics deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting statistics' },
      { status: 500 }
    );
  }
}
