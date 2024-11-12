import axios from 'axios';

export interface AvailabilityResponse {
	available: boolean;
	message: string;
	options: ReservationOption[];
}

export interface ReservationOption {
	id: string;
	label: string;
	title: string;
	description: string;
	gpuModel: string;
	gpuCount: number;
	price: number;
	pricePerDay: number;
	startDate: Date;
	duration: string;
	isPending: boolean;
	gpuIds: string[];
	caption?: string;
}

export interface ReservationData {
	email: string;
	gpuIds: string[];
	startDate: Date;
	endDate: Date;
}

// Check for GPU availability with the given parameters.
export const checkAvailability = async (data: {
	startDate: Date;
	numDays: number;
	maxPrice: number;
	gpuCount: number;
	modelType: string;
}): Promise<AvailabilityResponse> => {
	try {
		const response = await axios.post<AvailabilityResponse>(
			'/api/reservations/check-availability',
			data
		);
		return response.data;
	} catch (error) {
		console.error('Error checking availability:', error);
		throw new Error('An error occurred while checking availability.');
	}
};

// Create a new reservation.
export const createReservation = async (
	data: ReservationData
): Promise<any> => {
	try {
		const response = await axios.post('/api/reservations', data);
		return response.data;
	} catch (error) {
		console.error('Error creating reservation:', error);
		throw new Error('An error occurred while creating the reservation.');
	}
};
