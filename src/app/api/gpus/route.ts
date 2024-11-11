import { NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Gpu from '@/models/Gpu';

// GET : Fetch all GPUs.
export async function GET() {
	await connectToDB();

	try {
		const gpus = await Gpu.find();

		return NextResponse.json({ gpus }, { status: 200 });
	} catch (error) {
		console.error('Failed to fetch GPUs:', error);

		return NextResponse.json(
			{ error: 'Failed to fetch GPUs' },
			{ status: 500 }
		);
	}
}
