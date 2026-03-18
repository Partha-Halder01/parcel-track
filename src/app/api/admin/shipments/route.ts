import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateTrackingId() {
  return 'TRK' + Math.floor(10000000 + Math.random() * 90000000).toString()
}

function generatePassword() {
  return Math.random().toString(36).slice(-8)
}

export async function GET(req: NextRequest) {
  try {
    const shipments = await prisma.shipment.findMany({
      include: { timeline: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(shipments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shipments' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const trackingId = generateTrackingId()
    const password = generatePassword()

    const shipment = await prisma.shipment.create({
      data: {
        trackingId,
        password,
        senderName: data.senderName,
        receiverName: data.receiverName,
        address: data.address,
        parcelType: data.parcelType,
        estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : null,
        timeline: {
          create: [{
            status: 'Order Placed',
            description: 'Shipment has been created in the system',
            location: data.address
          }]
        }
      },
      include: {
        timeline: true
      }
    })

    return NextResponse.json({ success: true, shipment })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 })
  }
}
