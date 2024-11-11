import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '@/lib/db';
import Gpu from '@/models/Gpu';

// PUT : Update existing GPU by ID.
export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	await connectToDB();

	try {
		const id = params.id;
		const updateData = await req.json();

		if (!id) {
			return NextResponse.json(
				{ error: 'GPU id is required' },
				{ status: 400 }
			);
		}

		// Find and update the GPU by id.
		const updatedGpu = await Gpu.findByIdAndUpdate(id, updateData, {
			new: true,
		});

		if (!updatedGpu) {
			return NextResponse.json({ error: 'GPU not found' }, { status: 404 });
		}

		return NextResponse.json({ gpu: updatedGpu }, { status: 200 });
	} catch (error) {
		console.error('Failed to update GPU:', error);

		return NextResponse.json(
			{ error: 'Failed to update GPU' },
			{ status: 500 }
		);
	}
}
