import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipment = await queryOne<any>('SELECT * FROM Shipment WHERE id = ?', [params.id])
    if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })

    const timeline = await query('SELECT * FROM TimelineEvent WHERE shipmentId = ? ORDER BY timestamp DESC', [shipment.id])

    const { password, ...safeData } = shipment
    return NextResponse.json({ ...safeData, timeline })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
