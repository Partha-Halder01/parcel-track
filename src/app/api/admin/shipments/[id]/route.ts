import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipment = await queryOne('SELECT * FROM Shipment WHERE id = ?', [params.id])
    if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })

    const timeline = await query('SELECT * FROM TimelineEvent WHERE shipmentId = ? ORDER BY timestamp ASC', [params.id])

    return NextResponse.json({ ...shipment, timeline })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const { status, description, location, estimatedDelivery, timestamp } = data

    const updates: string[] = []
    const updateParams: any[] = []

    if (status) {
      updates.push('status = ?')
      updateParams.push(status)
    }
    if (estimatedDelivery) {
      updates.push('estimatedDelivery = ?')
      updateParams.push(new Date(estimatedDelivery))
    }
    updates.push('updatedAt = NOW()')

    if (updates.length > 0) {
      updateParams.push(params.id)
      await execute(`UPDATE Shipment SET ${updates.join(', ')} WHERE id = ?`, updateParams)
    }

    if (status || description || location) {
      const shipment = await queryOne('SELECT status FROM Shipment WHERE id = ?', [params.id])
      const timelineId = crypto.randomUUID()
      await execute(
        'INSERT INTO TimelineEvent (id, shipmentId, status, description, location, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
        [timelineId, params.id, status || shipment?.status, description || null, location || null, timestamp ? new Date(timestamp) : new Date()]
      )
    }

    const updatedShipment = await queryOne('SELECT * FROM Shipment WHERE id = ?', [params.id])
    const timeline = await query('SELECT * FROM TimelineEvent WHERE shipmentId = ? ORDER BY timestamp ASC', [params.id])

    return NextResponse.json({ success: true, shipment: { ...updatedShipment, timeline } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await execute('DELETE FROM TimelineEvent WHERE shipmentId = ?', [params.id])
    await execute('DELETE FROM Shipment WHERE id = ?', [params.id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete shipment' }, { status: 500 })
  }
}
