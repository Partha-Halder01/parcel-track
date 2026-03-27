import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const shipment = await prisma.shipment.findFirst({
      where: { shareToken: params.token },
      include: { timeline: { orderBy: { timestamp: 'desc' } } },
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Invalid or expired share link' }, { status: 404 })
    }

    // Return shipment data WITHOUT password
    const { password, shareToken, ...safeShipment } = shipment

    return NextResponse.json(safeShipment)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
