import { useState } from 'react';
import {
	validateGpuCount,
	validateDate,
	validateNumDays,
	validateMaxPrice,
	validateEmail,
} from '../utils/validation';
import { RadioCardData } from '@/components/RadioCard';

export const useFormFields = () => {
	const [gpuCount, setGpuCount] = useState<number>(1);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [numDays, setNumDays] = useState<string>('1');
	const [maxPrice, setMaxPrice] = useState<string>('0');
	const [email, setEmail] = useState<string>('');
	const [selectedReservationOption, setSelectedReservationOption] =
		useState<RadioCardData | null>(null);
	const [availabilityErrors, setAvailabilityErrors] = useState<{
		gpuCount: string;
		selectedDate: string;
		numDays: string;
		maxPrice: string;
	}>({
		gpuCount: '',
		selectedDate: '',
		numDays: '',
		maxPrice: '',
	});
	const [reservationErrors, setReservationErrors] = useState<{ email: string }>(
		{
			email: '',
		}
	);

	const handleGpuCountChange = (value: number) => {
		setGpuCount(value);
		setAvailabilityErrors((prev) => ({
			...prev,
			gpuCount: validateGpuCount(value),
		}));
	};

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setAvailabilityErrors((prev) => ({
			...prev,
			selectedDate: validateDate(date),
		}));
	};

	const handleNumDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNumDays(value);
		setAvailabilityErrors((prev) => ({
			...prev,
			numDays: validateNumDays(value),
		}));
	};

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setMaxPrice(value);
		setAvailabilityErrors((prev) => ({
			...prev,
			maxPrice: validateMaxPrice(value),
		}));
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setReservationErrors({ email: validateEmail(value) });
	};

	const handleReservationOptionChange = (option: RadioCardData) => {
		setSelectedReservationOption(option);
	};

	const resetReservationFields = () => {
		setSelectedReservationOption(null);
		setReservationErrors({ email: '' });
		setEmail('');
	};

	const resetAllFields = () => {
		setGpuCount(1);
		setSelectedDate(new Date());
		setNumDays('1');
		setMaxPrice('0');
		setEmail('');
		setAvailabilityErrors({
			gpuCount: '',
			selectedDate: '',
			numDays: '',
			maxPrice: '',
		});
		setReservationErrors({ email: '' });
	};

	return {
		gpuCount,
		selectedDate,
		numDays,
		maxPrice,
		email,
		selectedReservationOption,
		availabilityErrors,
		reservationErrors,
		handleGpuCountChange,
		handleDateChange,
		handleNumDaysChange,
		handleMaxPriceChange,
		handleEmailChange,
		handleReservationOptionChange,
		resetReservationFields,
		resetAllFields,
	};
};
