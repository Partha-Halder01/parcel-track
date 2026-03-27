import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

type ContactRow = {
  id: string
  name: string
  phone: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

async function ensureContactTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ContactMessage (
      id VARCHAR(191) NOT NULL PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL,
      subject VARCHAR(191) NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    )
  `)
}

export async function GET(req: NextRequest) {
  try {
    await ensureContactTable()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '0')
    const search = searchParams.get('search') || ''

    const searchClause = search
      ? `WHERE name LIKE '%${search.replace(/'/g, "''")}%' OR phone LIKE '%${search.replace(/'/g, "''")}%' OR email LIKE '%${search.replace(/'/g, "''")}%' OR subject LIKE '%${search.replace(/'/g, "''")}%'`
      : ''

    const countResult = await prisma.$queryRawUnsafe<[{ cnt: bigint }]>(`
      SELECT COUNT(*) as cnt FROM ContactMessage ${searchClause}
    `)
    const total = Number(countResult[0].cnt)

    const limitClause = limit > 0 ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : ''

    const contacts = await prisma.$queryRawUnsafe<ContactRow[]>(`
      SELECT id, name, phone, email, subject, message, createdAt
      FROM ContactMessage
      ${searchClause}
      ORDER BY createdAt DESC
      ${limitClause}
    `)

    return NextResponse.json({ contacts, total, page, totalPages: limit > 0 ? Math.ceil(total / limit) : 1 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
