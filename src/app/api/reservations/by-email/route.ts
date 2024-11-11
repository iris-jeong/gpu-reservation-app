import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// GET : Fetch reservation by email.
export async function GET(req: NextRequest) {
	await connectToDB();

	try {
		const { searchParams } = new URL(req.url);
		const email = searchParams.get('email');

		if (!email) {
			return NextResponse.json({ error: 'Email is required' }, { status: 400 });
		}

		const reservations = await Reservation.find({ email }).populate('gpuIds');
		if (reservations.length === 0) {
			return NextResponse.json(
				{ message: 'No reservations found for this email' },
				{ status: 400 }
			);
		}

		return NextResponse.json({ reservations }, { status: 200 });
	} catch (error) {
		console.error('Failed to fetch reservations by email:', error);
		return NextResponse.json(
			{ message: 'Failed to fetch reservations by email' },
			{ status: 500 }
		);
	}
}
