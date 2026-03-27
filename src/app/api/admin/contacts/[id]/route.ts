import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    await execute('DELETE FROM ContactMessage WHERE id = ?', [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}
