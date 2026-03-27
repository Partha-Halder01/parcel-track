import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, subject, message } = await req.json()

    if (!name || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Name, phone, subject and message are required' }, { status: 400 })
    }

    const id = crypto.randomUUID()
    await execute(
      'INSERT INTO ContactMessage (id, name, phone, email, subject, message, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [id, String(name).trim(), String(phone).trim(), String(email || '').trim(), String(subject).trim(), String(message).trim()]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}
