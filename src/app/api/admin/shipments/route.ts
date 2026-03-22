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
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '0')
    const search = searchParams.get('search') || ''

    const where = search ? {
      OR: [
        { trackingId: { contains: search } },
        { senderName: { contains: search } },
        { receiverName: { contains: search } },
        { address: { contains: search } },
      ]
    } : {}

    const total = await prisma.shipment.count({ where })

    const shipments = await prisma.shipment.findMany({
      where,
      include: { timeline: true },
      orderBy: { createdAt: 'desc' },
      ...(limit > 0 ? { skip: (page - 1) * limit, take: limit } : {}),
    })

    return NextResponse.json({ shipments, total, page, totalPages: limit > 0 ? Math.ceil(total / limit) : 1 })
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
