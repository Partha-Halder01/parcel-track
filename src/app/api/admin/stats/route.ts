import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const total = await queryOne<{ cnt: number }>('SELECT COUNT(*) as cnt FROM Shipment')
    const delivered = await queryOne<{ cnt: number }>("SELECT COUNT(*) as cnt FROM Shipment WHERE status = 'Delivered'")
    const pending = await queryOne<{ cnt: number }>("SELECT COUNT(*) as cnt FROM Shipment WHERE status = 'Order Placed'")
    const inTransit = await queryOne<{ cnt: number }>("SELECT COUNT(*) as cnt FROM Shipment WHERE status = 'In Transit'")

    return NextResponse.json({
      total: Number(total?.cnt || 0),
      delivered: Number(delivered?.cnt || 0),
      pending: Number(pending?.cnt || 0),
      inTransit: Number(inTransit?.cnt || 0),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
