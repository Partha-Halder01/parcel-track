import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { trackingId, password } = await req.json()

    if (!trackingId || !password) {
      return NextResponse.json({ error: 'Tracking ID and password are required' }, { status: 400 })
    }

    const shipment = await prisma.shipment.findUnique({
      where: { trackingId }
    })

    if (!shipment || shipment.password !== password) {
      return NextResponse.json({ error: 'Invalid tracking ID or password' }, { status: 401 })
    }

    // In a real app we would use JWT, returning token
    return NextResponse.json({ success: true, token: shipment.id })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
