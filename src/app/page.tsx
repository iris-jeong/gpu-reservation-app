'use client';
import { useState } from 'react';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import TextInput from '@/components/TextInput';
import { FaDollarSign } from 'react-icons/fa6';
import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/Button';
import { RadioCardData } from '@/components/RadioCard';
import RadioCardGroup from '@/components/RadioCardGroup';
import Form from '@/components/Form';
import Modal from '@/components/Modal';
import { HiOutlineMail } from 'react-icons/hi';

const options = [
	{
		id: 'pending',
		label: 'Pending Reservation',
		title: 'Wait for price drop',
		description:
			'Your reservation will be in pending and will only be confirmed if the market price drops below or at your specified maximum price.',
		gpuModel: 'NVIDIA H100',
		gpuCount: 2,
		price: 130.98,
		pricePerDay: 43.66,
		startDate: new Date('2024-12-01'),
		duration: '3',
		isPending: true,
		caption:
			'If the price does not reach your maximum average price before the start date, your reservation will be canceled and you will pay nothing.',
	},
	{
		id: 'confirmed',
		label: 'Immediate Reservation',
		title: 'Reserve now at current market price',
		description:
			'Pay the current market price, which is currently above your specified max average price per day, and reserve it immediately.',
		gpuModel: 'NVIDIA H100',
		gpuCount: 2,
		price: 135.98,
		pricePerDay: 44.66,
		startDate: new Date('2024-12-01'),
		duration: '3',
		isPending: false,
		caption:
			'This will allow you to reserve your GPUs for the specified date immediately.',
	},
];

// Validation functions
const validateGpuCount = (value: number) =>
	value > 0 ? '' : 'Invalid number of GPUs';
const validateDate = (value: Date) =>
	!isNaN(value.getTime()) ? '' : 'Invalid date';
const validateNumDays = (value: string) =>
	value.trim() === ''
		? 'Number of days is required'
		: isNaN(Number(value)) || Number(value) <= 0
		? 'Please enter a valid number of days'
		: '';
const validateMaxPrice = (value: string) =>
	value.trim() === ''
		? 'Max average price is required'
		: isNaN(Number(value)) || Number(value) < 0
		? 'Please enter a valid price'
		: '';
const validateEmail = (value: string) =>
	value.match(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
		? ''
		: 'Invalid email address';

export default function Home() {
	// Availability Form State
	const [gpuCount, setGpuCount] = useState<number>(1);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [numDays, setNumDays] = useState<string>('1');
	const [maxPrice, setMaxPrice] = useState<string>('0');
	const [availabilityErrors, setAvailabilityErrors] = useState({
		gpuCount: '',
		selectedDate: '',
		numDays: '',
		maxPrice: '',
	});
	const isAvailabilityValid = !Object.values(availabilityErrors).some(Boolean);

	// Reservation Form State
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedReservationOption, setSelectedReservationOption] =
		useState<RadioCardData | null>(null);
	const [email, setEmail] = useState('');
	const [reservationErrors, setReservationErrors] = useState({ email: '' });
	const isReservationValid =
		selectedReservationOption !== null &&
		email.trim() !== '' &&
		!reservationErrors.email;

	// Availability Form Handlers
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

	// Open modal if Availability form is valid
	const handleCheckAvailability = (e: React.FormEvent) => {
		e.preventDefault();

		if (isAvailabilityValid) {
			setIsModalOpen(true);
		}
	};

	// Reservation Form Handlers
	const handleReservationOptionChange = (option: RadioCardData) => {
		setSelectedReservationOption(option);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setReservationErrors({ email: validateEmail(value) });
	};

	// Submit reservation if Reservation form is valid
	const handleSubmitReservation = (e: React.FormEvent) => {
		e.preventDefault();
		if (isReservationValid) {
			console.log('Reservation submitted:', {
				selectedReservationOption,
				email,
			});
			setIsModalOpen(false);
		}
	};

	const toggleModal = () => setIsModalOpen((prev) => !prev);

	return (
		<main className="pt-12 md:pt-24 sm:w-2/3 md:w-1/2 max-w-[650px]">
			<header className="mb-10">
				<h1 className="text-5xl font-semibold">
					Reserve NVIDIA H100 GPU Power
				</h1>
				<h2 className="text-2xl">
					Access high-performance GPU computing with easy reservations by the
					day.
				</h2>
				<p>Get started by entering your reservation details below.</p>
			</header>

			{/* AVAILABILITY CHECK FORM */}
			<Form onSubmit={handleCheckAvailability}>
				<div className="grid grid-cols-1 mb-5">
					{/* GPU Count */}
					<ToggleButtonGroup
						label="# of GPUs"
						options={[1, 2, 3, 4, 5, 6, 7, 8]}
						onChange={handleGpuCountChange}
						selectedOption={gpuCount}
						error={availabilityErrors.gpuCount || ''}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Start Date */}
					<DatePicker
						selectedDate={selectedDate}
						onDateChange={handleDateChange}
						label="Start Date"
						className="md:col-span-2"
					/>
					{/* Number of Days */}
					<TextInput
						label="# of Days"
						id="numDays"
						value={numDays}
						onChange={handleNumDaysChange}
						endIcon="days"
						className="md:col-span-1"
						error={availabilityErrors.numDays || ''}
						required
					/>
				</div>

				<div className="grid grid-cols-1 mb-8">
					{/* Max Avg Price */}
					<TextInput
						label="Max Avg. Price"
						id="maxPrice"
						value={maxPrice}
						onChange={handleMaxPriceChange}
						startIcon={<FaDollarSign />}
						error={availabilityErrors.maxPrice || ''}
						required
					/>
				</div>

				<Button
					type="submit"
					id="check-availability-button"
					disabled={!isAvailabilityValid}
				>
					Check availability
				</Button>
			</Form>

			{/* MODAL WITH RESERVATION FORM */}
			<Modal isOpen={isModalOpen} onClose={toggleModal}>
				<Form onSubmit={handleSubmitReservation}>
					<div className="bg-orange-300 p-6">
						<RadioCardGroup
							options={options}
							onSelectionChange={handleReservationOptionChange}
						/>
					</div>

					<div className="bg-lime-300 flex justify-center p-6">
						<div className="w-fit bg-yellow-300">
							<TextInput
								id="email-address"
								label="Email Address"
								placeholder="Enter your email address"
								value={email}
								onChange={handleEmailChange}
								error={reservationErrors.email}
								startIcon={<HiOutlineMail />}
								required
							/>
							<Button
								type="submit"
								isLoading={false}
								disabled={!isReservationValid}
							>
								{selectedReservationOption?.id === 'pending'
									? 'Wait for price drop'
									: 'Reserve now'}
							</Button>
						</div>
					</div>
				</Form>
			</Modal>
		</main>
	);
}
