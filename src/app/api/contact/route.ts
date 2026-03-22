import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function ensureContactTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ContactMessage (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      phone VARCHAR(50) NOT NULL DEFAULT '',
      email VARCHAR(191) NOT NULL DEFAULT '',
      subject VARCHAR(191) NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )
  `)
  // Add phone column if it doesn't exist (for existing tables)
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE ContactMessage ADD COLUMN phone VARCHAR(50) NOT NULL DEFAULT '' AFTER name`)
  } catch {
    // Column already exists
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, subject, message } = await req.json()

    if (!name || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Name, phone, subject and message are required' }, { status: 400 })
    }

    await ensureContactTable()

    const id = crypto.randomUUID()
    await prisma.$executeRawUnsafe(
      `
      INSERT INTO ContactMessage (id, name, phone, email, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      id,
      String(name).trim(),
      String(phone).trim(),
      String(email || '').trim(),
      String(subject).trim(),
      String(message).trim()
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}
