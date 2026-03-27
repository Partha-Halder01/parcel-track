import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const shipment = await queryOne<any>('SELECT id, shareToken FROM Shipment WHERE id = ?', [params.id])
    if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })

    if (shipment.shareToken) {
      return NextResponse.json({ shareToken: shipment.shareToken })
    }

    const shareToken = crypto.randomBytes(32).toString('hex')
    await execute('UPDATE Shipment SET shareToken = ? WHERE id = ?', [shareToken, params.id])

    return NextResponse.json({ shareToken })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate share link' }, { status: 500 })
  }
}
