'use client';
import { useState } from 'react';
import { RadioCardData } from '@/components/RadioCard';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import {
	AvailabilityResponse,
	checkAvailability,
	createReservation,
	ReservationData,
} from '@/services/apiService';
import { useFormFields } from './hooks/useFormFields';
import AvailabilityForm from '@/components/AvailabilityForm';
import ReservationForm from '@/components/ReservationForm';

export default function Home() {
	const {
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
	} = useFormFields();
	const isAvailabilityValid = !Object.values(availabilityErrors).some(Boolean);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<RadioCardData[]>([]);
	const [showNotification, setShowNotification] = useState(false);

	const isReservationValid =
		selectedReservationOption !== null &&
		email.trim() !== '' &&
		!reservationErrors.email;

	const toggleModal = () => {
		if (isModalOpen) {
			resetReservationFields();
		}
		setIsModalOpen((prev) => !prev);
	};

	const handleCheckAvailability = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isAvailabilityValid) return;

		try {
			const data = {
				startDate: selectedDate,
				numDays: parseInt(numDays),
				maxPrice: parseFloat(maxPrice),
				gpuCount,
				modelType: 'NVIDIA H100',
			};
			const { available, message, options }: AvailabilityResponse =
				await checkAvailability(data);

			if (!available) {
				alert(message);
				return;
			}
			setOptions(options);
			setIsModalOpen(true);
		} catch (error) {
			console.error('Error checking availability:', error);
			alert('An error occurred while checking availability. Please try again.');
		}
	};

	const handleSubmitReservation = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!selectedReservationOption || !email) return;

		const reservationData: ReservationData = {
			email,
			gpuIds: selectedReservationOption.gpuIds,
			startDate: selectedReservationOption.startDate,
			endDate: new Date(
				new Date(selectedReservationOption.startDate).setDate(
					new Date(selectedReservationOption.startDate).getDate() +
						parseInt(selectedReservationOption.duration)
				)
			),
		};

		// Create the reservation.
		try {
			await createReservation(reservationData);
			setIsModalOpen(false);
			resetAllFields();
			setShowNotification(true);
		} catch (error) {
			console.error('Error creating reservation:', error);
		}
	};

	return (
		<main className="pt-8 sm:pt-24 md:pt-48 px-4 sm:px-8 w-screen min-w-screen sm:max-w-xl font-[family-name:var(--font-geist-sans)]">
			{showNotification && (
				<Notification
					message="Reservation successful!"
					onClose={() => setShowNotification(false)}
				/>
			)}
			<header className="mb-6 sm:mb-8">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
					Reserve NVIDIA H100 GPU Power
				</h1>
				<h2 className="text-lg tracking-tight mb-4 sm:mb-6 text-slate-900 font-[family-name:var(--font-geist-mono)]">
					Access high-performance GPU computing with easy reservations by the
					day.
				</h2>
				<p className="text-slate-600 font-[family-name:var(--font-geist-sans)]">
					Get started by entering your reservation details below.
				</p>
			</header>

			<AvailabilityForm
				gpuCount={gpuCount}
				selectedDate={selectedDate}
				numDays={numDays}
				maxPrice={maxPrice}
				availabilityErrors={availabilityErrors}
				handleGpuCountChange={handleGpuCountChange}
				handleDateChange={handleDateChange}
				handleNumDaysChange={handleNumDaysChange}
				handleMaxPriceChange={handleMaxPriceChange}
				handleCheckAvailability={handleCheckAvailability}
				isAvailabilityValid={isAvailabilityValid}
			/>

			<Modal isOpen={isModalOpen} onClose={toggleModal}>
				<ReservationForm
					options={options}
					selectedReservationOption={selectedReservationOption}
					email={email}
					reservationErrors={reservationErrors}
					handleReservationOptionChange={handleReservationOptionChange}
					handleEmailChange={handleEmailChange}
					handleSubmitReservation={handleSubmitReservation}
					isReservationValid={isReservationValid}
				/>
			</Modal>
		</main>
	);
}
