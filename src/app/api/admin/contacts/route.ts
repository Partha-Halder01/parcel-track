import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '0')
    const search = searchParams.get('search') || ''

    let whereClause = ''
    const params: any[] = []

    if (search) {
      whereClause = 'WHERE name LIKE ? OR phone LIKE ? OR email LIKE ? OR subject LIKE ?'
      const s = `%${search}%`
      params.push(s, s, s, s)
    }

    const countResult = await queryOne<{ cnt: number }>(`SELECT COUNT(*) as cnt FROM ContactMessage ${whereClause}`, params)
    const total = Number(countResult?.cnt || 0)

    let limitClause = ''
    const queryParams = [...params]
    if (limit > 0) {
      limitClause = 'LIMIT ? OFFSET ?'
      queryParams.push(limit, (page - 1) * limit)
    }

    const contacts = await query(
      `SELECT id, name, phone, email, subject, message, createdAt FROM ContactMessage ${whereClause} ORDER BY createdAt DESC ${limitClause}`,
      queryParams
    )

    return NextResponse.json({ contacts, total, page, totalPages: limit > 0 ? Math.ceil(total / limit) : 1 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
