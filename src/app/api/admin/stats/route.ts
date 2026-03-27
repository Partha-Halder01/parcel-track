import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const total = await prisma.shipment.count()
    const delivered = await prisma.shipment.count({ where: { status: 'Delivered' } })
    const pending = await prisma.shipment.count({ where: { status: 'Order Placed' } })
    const inTransit = await prisma.shipment.count({ where: { status: 'In Transit' } })

    return NextResponse.json({ total, delivered, pending, inTransit })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
