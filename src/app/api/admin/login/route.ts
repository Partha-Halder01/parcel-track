import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    // Auto-create admin if not exists
    const existing = await queryOne<any>('SELECT id FROM Admin WHERE username = ?', ['admin'])
    if (!existing) {
      const hashedPassword = await bcrypt.hash('Hffwekfn424.@', 10)
      const id = crypto.randomUUID()
      await execute('INSERT INTO Admin (id, username, password, createdAt) VALUES (?, ?, ?, NOW())', [id, 'admin', hashedPassword])
    }

    const admin = await queryOne<any>('SELECT * FROM Admin WHERE username = ?', [username])
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' })

    return NextResponse.json({ success: true, token })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
