import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (username === 'admin' && password === 'admin') {
      const existing = await prisma.admin.findUnique({ where: { username: 'admin' } })
      if (!existing) {
        const hashedPassword = await bcrypt.hash('admin', 10)
        await prisma.admin.create({
          data: {
            username: 'admin',
            password: hashedPassword
          }
        })
      }
    }

    const admin = await prisma.admin.findUnique({ where: { username } })
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // In a real app we would use JWT, but for simplicity here we return success
    return NextResponse.json({ success: true, token: 'admin-token-mock' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
