import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, service, meetingDate, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'contactSubmissions'), {
      name: name.trim(),
      email: email.trim(),
      service: service || '',
      meetingDate: meetingDate || '',
      message: message.trim(),
      timestamp: serverTimestamp(),
      status: 'new'
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        id: docRef.id 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error submitting form:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to submit form. Please try again later.'
    
    if (error?.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please check Firebase Firestore rules.'
    } else if (error?.code === 'unavailable') {
      errorMessage = 'Firebase service is temporarily unavailable. Please try again later.'
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error?.code || 'unknown_error' },
      { status: 500 }
    )
  }
}

