import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    const shipment = await queryOne<any>('SELECT * FROM Shipment WHERE shareToken = ?', [params.token])
    if (!shipment) {
      return NextResponse.json({ error: 'Invalid or expired share link' }, { status: 404 })
    }

    const timeline = await query('SELECT * FROM TimelineEvent WHERE shipmentId = ? ORDER BY timestamp DESC', [shipment.id])

    const { password, shareToken, ...safeShipment } = shipment
    return NextResponse.json({ ...safeShipment, timeline })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
