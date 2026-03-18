import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: params.id },
      include: { timeline: { orderBy: { timestamp: 'desc' } } }
    })

    if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })

    // Omit sensitive data
    const { password, ...safeData } = shipment
    return NextResponse.json(safeData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
