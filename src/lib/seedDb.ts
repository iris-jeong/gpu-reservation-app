import mongoose from 'mongoose';
import Gpu, { GpuStatus } from '@/models/Gpu';
import Reservation, { ReservationStatus } from '@/models/Reservation';

// DB connection configuration.
const MONGODB_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/gpu-reservation';
if (!MONGODB_URI) {
	throw new Error('MONGODB_URI environment variable is not set');
}

// Function to populate GPUs.
export async function populateGpus() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Connected to MongoDB');

		// Clear existing GPUs.
		await Gpu.deleteMany({});

		const numberOfGpus = 10;
		const gpuDocuments = [];
		const modelType = 'NVIDIA H100';

		for (let i = 1; i <= numberOfGpus; i++) {
			gpuDocuments.push({
				uuid: `uuid-${i}`,
				modelType: modelType,
				status: GpuStatus.AVAILABLE,
				rentalStart: null,
				rentalEnd: null,
			});
		}

		// Insert documents into the GPU collection.
		const result = await Gpu.insertMany(gpuDocuments);
		console.log('Successfully seeded the GPU collection:', result);
	} catch (error) {
		console.error('Error seeding the database:', error);
	} finally {
		mongoose.disconnect();
	}
}

// Function to populate reservations.
export async function populateReservations() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Connected to MongoDB');

		// Clear existing reservations.
		await Reservation.deleteMany({});

		// Fetch GPUs to create reservations.
		const gpus = await Gpu.find().limit(3); // Select the first few GPUs for reservations.

		if (gpus.length === 0) {
			console.log('No GPUs found to create reservations');
			return;
		}

		const reservationDocuments = await Promise.all(
			gpus.map(async (gpu, index) => {
				const isConfirmed = index % 2 === 0; // Alternate status for variety.
				const reservation = {
					email: `user${index + 1}@email.com`,
					gpuIds: [gpu._id], // Each reservation has 1 gpu for simplicity.
					startDate: new Date(),
					endDate: new Date(
						new Date().setDate(new Date().getDate() + ((index % 5) + 1))
					), // Stagger end dates.
					status: isConfirmed
						? ReservationStatus.CONFIRMED
						: ReservationStatus.PENDING,
				};

				// If reservation is confirmed, update the GPU status to reserved.
				if (isConfirmed) {
					await Gpu.findByIdAndUpdate(gpu._id, { status: GpuStatus.RESERVED });
				}

				return reservation;
			})
		);

		// Insert reservations into the collection.
		const result = await Reservation.insertMany(reservationDocuments);
		console.log('Successfully seeded the Reservation collection:', result);
	} catch (error) {
		console.error('Error seeding the reservations:', error);
	} finally {
		mongoose.disconnect();
	}
}
