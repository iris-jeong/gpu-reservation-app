import { calculatePricePerDay } from '@/app/utils/pricing';
import connectToDB from '@/lib/db';
import Gpu from '@/models/Gpu';
import Reservation from '@/models/Reservation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	await connectToDB();

	try {
		const { startDate, numDays, maxPrice, gpuCount, modelType } =
			await req.json();
		const start = new Date(startDate);

		// Calculate the end date for the requested duration
		const dates = Array.from({ length: numDays }, (_, i) => {
			const date = new Date(start);
			date.setDate(start.getDate() + i);
			return date;
		});

		let totalPrice = 0;
		let calculatedPricePerDay = 0;
		let allAvailableGpuIds: string[] = [];

		for (const date of dates) {
			const endOfDay = new Date(date);
			endOfDay.setHours(23, 59, 59, 999);

			// 1: Get available GPUs
			const initiallyAvailableGpus = await Gpu.find({
				modelType,
				status: 'available',
			});
			// Find GPUs that will become available by checking reservations ending on or before this date.
			const reservationsEndingByDate = await Reservation.find({
				gpuIds: { $exists: true },
				modelType,
				endDate: { $lte: endOfDay }, // Reservations that end on or before the current date.
			});
			const becomingAvailableGpuIds = reservationsEndingByDate.flatMap(
				(reservation) => reservation.gpuIds.map((id) => id.toString())
			);

			// Combine initially available GPUs and those becoming available.
			const allGpuIds = [
				...new Set([
					...initiallyAvailableGpus.map((gpu) => gpu._id.toString()),
					...becomingAvailableGpuIds,
				]),
			];

			// 2: Filter out GPUs with reservations overlapping this specific day.
			const overlappingReservations = await Reservation.find({
				gpuIds: { $in: allGpuIds },
				startDate: { $lt: endOfDay },
				endDate: { $gt: date },
			});

			const reservedGpuIds = new Set(
				overlappingReservations.flatMap((reservation) =>
					reservation.gpuIds.map((id) => id.toString())
				)
			);

			const availableGpuIds = allGpuIds.filter(
				(gpuId) => !reservedGpuIds.has(gpuId)
			);

			// Add the available GPUs for this date to the overall array of available GPUs
			allAvailableGpuIds = [
				...new Set([...allAvailableGpuIds, ...availableGpuIds]),
			];

			// 3: Determine the price tier for the current day based on available GPUs.
			const dailyPricePerGpu = calculatePricePerDay(availableGpuIds.length);
			calculatedPricePerDay = dailyPricePerGpu;

			// Calculate the total daily price for the requested number of GPUs.
			const dailyPrice = dailyPricePerGpu * gpuCount;
			totalPrice += dailyPrice;
		}

		// Prepare options with the total price calculated across multiple days
		const dayLabel = numDays === 1 ? 'day' : 'days';
		if (calculatedPricePerDay <= maxPrice) {
			return NextResponse.json(
				{
					available: true,
					options: [
						{
							id: 'confirmed',
							label: 'Immediate Reservation',
							title: 'Reserve now at current market price',
							description: `The GPUs requested are available during the specified days. Reserve ${modelType} GPUs with a daily rate based on each day's availability.`,
							gpuModel: modelType,
							gpuCount,
							gpuIds: allAvailableGpuIds,
							price: totalPrice,
							pricePerDay: calculatedPricePerDay,
							startDate: start,
							duration: `${numDays} ${dayLabel}`,
							isPending: false,
						},
					],
				},
				{ status: 200 }
			);
		}

		// If the price exceeds the max price, offer both "pending" and "immediate" options.
		return NextResponse.json(
			{
				available: true,
				options: [
					{
						id: 'pending',
						label: 'Pending Reservation',
						title: 'Wait for price drop',
						description:
							'Your reservation will be pending and only confirmed if the price drops to your specified range.',
						gpuModel: modelType,
						gpuCount,
						gpuIds: allAvailableGpuIds,
						price: maxPrice * gpuCount * numDays,
						pricePerDay: maxPrice,
						startDate: start,
						duration: `${numDays} ${dayLabel}`,
						isPending: true,
						caption:
							'Your reservation will be canceled if the price does not drop before your start date.',
					},
					{
						id: 'confirmed',
						label: 'Immediate Reservation',
						title: 'Reserve now at current market price',
						description:
							'Reserve immediately at the current market price, which exceeds your specified maximum.',
						gpuModel: modelType,
						gpuCount,
						gpuIds: allAvailableGpuIds,
						price: totalPrice,
						pricePerDay: totalPrice / numDays,
						startDate: start,
						duration: `${numDays} ${dayLabel}`,
						isPending: false,
						caption:
							'This will allow you to reserve your GPUs immediately for the specified time frame',
					},
				],
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Failed to check GPU availability:', error);
		return NextResponse.json(
			{ error: 'Failed to check availability' },
			{ status: 500 }
		);
	}
}
