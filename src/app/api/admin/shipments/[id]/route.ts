import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: params.id },
      include: { timeline: { orderBy: { timestamp: 'asc' } } }
    })

    if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })

    return NextResponse.json(shipment)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const { status, description, location, estimatedDelivery, timestamp } = data

    const shipment = await prisma.shipment.update({
      where: { id: params.id },
      data: {
        status: status || undefined,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : undefined,
      }
    })

    if (status || description || location) {
      await prisma.timelineEvent.create({
        data: {
          shipmentId: params.id,
          status: status || shipment.status,
          description,
          location,
          ...(timestamp ? { timestamp: new Date(timestamp) } : {}),
        }
      })
    }

    const updatedShipment = await prisma.shipment.findUnique({
      where: { id: params.id },
      include: { timeline: { orderBy: { timestamp: 'asc' } } }
    })

    return NextResponse.json({ success: true, shipment: updatedShipment })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.shipment.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete shipment' }, { status: 500 })
  }
}
