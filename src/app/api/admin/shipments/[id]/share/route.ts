import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipment = await prisma.shipment.findUnique({ where: { id: params.id } })
    if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })

    // If share token already exists, return it
    if (shipment.shareToken) {
      return NextResponse.json({ shareToken: shipment.shareToken })
    }

    // Generate a secure random token
    const shareToken = crypto.randomBytes(32).toString('hex')

    await prisma.shipment.update({
      where: { id: params.id },
      data: { shareToken },
    })

    return NextResponse.json({ shareToken })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate share link' }, { status: 500 })
  }
}
