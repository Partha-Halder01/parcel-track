import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    // Auto-create admin if not exists
    const existing = await prisma.admin.findUnique({ where: { username: 'admin' } })
    if (!existing) {
      const hashedPassword = await bcrypt.hash('Hffwekfn424.@', 10)
      await prisma.admin.create({
        data: {
          username: 'admin',
          password: hashedPassword
        }
      })
    }

    const admin = await prisma.admin.findUnique({ where: { username } })
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
