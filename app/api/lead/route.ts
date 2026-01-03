import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, company, email } = body

    if (!name || !company || !email) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Store the lead in a database
    // 2. Send notification emails
    // 3. Integrate with a CRM
    // 4. Add to email marketing list

    console.log('New lead received:', body)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
