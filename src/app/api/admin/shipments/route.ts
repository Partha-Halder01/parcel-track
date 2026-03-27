import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'

export const dynamic = 'force-dynamic'

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

    let whereClause = ''
    const params: any[] = []

    if (search) {
      whereClause = 'WHERE trackingId LIKE ? OR senderName LIKE ? OR receiverName LIKE ? OR address LIKE ?'
      const s = `%${search}%`
      params.push(s, s, s, s)
    }

    const countResult = await queryOne<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM Shipment ${whereClause}`, params)
    const total = Number(countResult?.cnt || 0)

    let limitClause = ''
    const queryParams = [...params]
    if (limit > 0) {
      limitClause = 'LIMIT ? OFFSET ?'
      queryParams.push(limit, (page - 1) * limit)
    }

    const shipments = await query(`SELECT * FROM Shipment ${whereClause} ORDER BY createdAt DESC ${limitClause}`, queryParams)

    // Attach timeline events to each shipment
    for (const shipment of shipments) {
      const timeline = await query('SELECT * FROM TimelineEvent WHERE shipmentId = ? ORDER BY timestamp ASC', [shipment.id])
      shipment.timeline = timeline
    }

    return NextResponse.json({ shipments, total, page, totalPages: limit > 0 ? Math.ceil(total / limit) : 1 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch shipments' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const trackingId = generateTrackingId()
    const password = generatePassword()
    const id = crypto.randomUUID()

    await execute(
      `INSERT INTO Shipment (id, trackingId, password, senderName, receiverName, address, parcelType, status, estimatedDelivery, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Order Placed', ?, NOW(), NOW())`,
      [id, trackingId, password, data.senderName, data.receiverName, data.address, data.parcelType, data.estimatedDelivery ? new Date(data.estimatedDelivery) : null]
    )

    const timelineId = crypto.randomUUID()
    await execute(
      'INSERT INTO TimelineEvent (id, shipmentId, status, description, location, timestamp) VALUES (?, ?, ?, ?, ?, NOW())',
      [timelineId, id, 'Order Placed', 'Shipment has been created in the system', data.address]
    )

    const shipment = await queryOne('SELECT * FROM Shipment WHERE id = ?', [id])
    const timeline = await query('SELECT * FROM TimelineEvent WHERE shipmentId = ? ORDER BY timestamp ASC', [id])

    return NextResponse.json({ success: true, shipment: { ...shipment, timeline } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create shipment' }, { status: 500 })
  }
}
