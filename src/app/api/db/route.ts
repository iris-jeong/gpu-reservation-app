import { NextResponse } from 'next/server';
import { populateGpus, populateReservations } from '@/lib/seedDb';

export async function GET() {
	try {
		await populateGpus();
		await populateReservations();
		return NextResponse.json({
			message: 'GPU & Reservation collections populated successfully',
		});
	} catch (error) {
		console.error('Error seeding the database', error);
		return NextResponse.json({
			message: 'Error populating the database',
			error,
		});
	}
}
