import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// PUT : Update an existing reservation by ID.
export async function PUT(req: NextRequest) {
	await connectToDB();

	try {
		const url = new URL(req.url);
		const id = url.pathname.split('/').pop();
		const updateData = await req.json();

		if (!id) {
			return NextResponse.json(
				{ error: 'Reservation ID is required.' },
				{ status: 400 }
			);
		}

		const updatedReservation = await Reservation.findByIdAndUpdate(
			id,
			updateData,
			{ new: true }
		);
		if (!updatedReservation) {
			return NextResponse.json(
				{ error: 'Reservation not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ reservation: updatedReservation },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Failed to update the reservation:', error);
		return NextResponse.json(
			{ error: 'Failed to update the reservation' },
			{ status: 500 }
		);
	}
}

// DELETE : Delete a reservation by ID.
export async function DELETE(req: NextRequest) {
	await connectToDB();

	try {
		const url = new URL(req.url);
		const id = url.pathname.split('/').pop();

		if (!id) {
			return NextResponse.json(
				{ error: 'Reservation ID is required' },
				{ status: 400 }
			);
		}

		const deletedReservation = await Reservation.findByIdAndDelete(id);
		if (!deletedReservation) {
			return NextResponse.json(
				{ error: 'Reservation not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: 'Reservation deleted successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Failed to delete reservation:', error);
		return NextResponse.json(
			{ error: 'Failed to delete reservation' },
			{ status: 500 }
		);
	}
}
