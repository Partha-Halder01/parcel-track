import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { trackingId, password } = await req.json()

    if (!trackingId || !password) {
      return NextResponse.json({ error: 'Tracking ID and password are required' }, { status: 400 })
    }

    const shipment = await queryOne<any>('SELECT id, password FROM Shipment WHERE trackingId = ?', [trackingId])

    if (!shipment || shipment.password !== password) {
      return NextResponse.json({ error: 'Invalid tracking ID or password' }, { status: 401 })
    }

    return NextResponse.json({ success: true, token: shipment.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
