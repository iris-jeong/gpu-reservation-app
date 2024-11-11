import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// GET : Fetch all reservations.
export async function GET() {
	await connectToDB();

	try {
		const reservations = await Reservation.find().populate('gpuIds'); // Populate if there are references.

		return NextResponse.json({ reservations }, { status: 200 });
	} catch (error) {
		console.error('Failed to fetch reservations:', error);

		return NextResponse.json(
			{ error: 'Failed to fetch reservations' },
			{ status: 500 }
		);
	}
}

// POST : Create a new reservation.
export async function POST(req: NextRequest) {
	await connectToDB();

	try {
		const body = await req.json();
		if (!body.email || !body.gpuIds || !body.startDate || !body.endDate) {
			return NextResponse.json(
				{
					error:
						'All fields (email, GPU IDs, start date, and end date) are required',
				},
				{ status: 400 }
			);
		}

		const newReservation = new Reservation(body);
		await newReservation.save();

		return NextResponse.json({ reservation: newReservation }, { status: 201 });
	} catch (error) {
		console.error('Failed to create reservation:', error);
		return NextResponse.json(
			{ error: 'Failed to create reservation' },
			{ status: 500 }
		);
	}
}
