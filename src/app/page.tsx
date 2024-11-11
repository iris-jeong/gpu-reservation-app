'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import TextInput from '@/components/TextInput';
import { FaDollarSign } from 'react-icons/fa6';
import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/Button';
import RadioCard, { RadioCardData } from '@/components/RadioCard';
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

export default function Home() {
	const [selectedDate, setSelectedDate] = useState<Date>(
		new Date('2024-01-01')
	);
	const [gpuCount, setGpuCount] = useState<number>(1);
	const [numDays, setNumDays] = useState<number>(1);
	const [maxPrice, setMaxPrice] = useState<number>(0);
	const [selectedOption, setSelectedOption] = useState<RadioCardData | null>(
		null
	);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		setSelectedDate(new Date());
	}, []);

	const handleGpuCountChange = (value: number) => {
		setGpuCount(value);
	};

	const handleReservationOptionChange = (selectedOption: RadioCardData) => {
		setSelectedOption(selectedOption);
		console.log('option: ', selectedOption);
	};

	const toggleModal = () => setIsModalOpen((prev) => !prev);

	const handleCheckAvailability = () => {
		setIsModalOpen(true);
	};

	const handleSubmitReservation = () => {
		console.log('submitted reservation');
	};

	return (
		<main className="bg-slate-100 pt-24 w-3/4">
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

			<div className="border-2">
				<Form onSubmit={handleCheckAvailability}>
					<ToggleButtonGroup
						label="# of GPUs"
						options={[1, 2, 3, 4, 5, 6, 7, 8]}
						onChange={handleGpuCountChange}
						selectedOption={gpuCount}
					/>
					<TextInput label="# of Days" type="number" id="numDays" />
					<TextInput
						label="Max Avg. Price"
						id="maxPrice"
						startIcon={<FaDollarSign />}
					/>
					<DatePicker
						selectedDate={selectedDate}
						onDateChange={setSelectedDate}
						label="Start Date"
					/>
					<Button
						id="check-availability-button"
						disabled={false}
						onClick={handleCheckAvailability}
					>
						Check availability
					</Button>
				</Form>

				<Modal isOpen={isModalOpen} onClose={toggleModal}>
					<Form onSubmit={handleSubmitReservation}>
						<RadioCardGroup
							options={options}
							onSelectionChange={handleReservationOptionChange}
						/>

						<TextInput
							id="email-address"
							label="Email Address"
							placeholder="Enter your email address"
							error=""
							startIcon={<HiOutlineMail />}
						/>
						<Button
							isLoading={false}
							disabled={!selectedOption}
							onClick={handleSubmitReservation}
						>
							{selectedOption?.id === 'pending'
								? 'Wait for price drop'
								: selectedOption?.id === 'confirmed'
								? 'Reserve now'
								: 'Reserve now'}
						</Button>
					</Form>
				</Modal>
			</div>
		</main>
	);
}
