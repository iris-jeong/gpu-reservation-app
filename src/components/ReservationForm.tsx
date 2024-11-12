import React from 'react';
import Form from '@/components/Form';
import RadioCardGroup from '@/components/RadioCardGroup';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/Button';
import { HiOutlineMail } from 'react-icons/hi';
import { RadioCardData } from '@/components/RadioCard';

interface ReservationFormProps {
	options: RadioCardData[];
	selectedReservationOption: RadioCardData | null;
	email: string;
	reservationErrors: { email: string };
	handleReservationOptionChange: (option: RadioCardData) => void;
	handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmitReservation: (e: React.FormEvent) => Promise<void>;
	isReservationValid: boolean;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
	options,
	selectedReservationOption,
	email,
	reservationErrors,
	handleReservationOptionChange,
	handleEmailChange,
	handleSubmitReservation,
	isReservationValid,
}) => {
	return (
		<section aria-labelledby="reservation-options" className="bg-[#F4F4F4]">
			<h3 id="reservation-options" className="sr-only">
				Reservation Options
			</h3>
			<Form onSubmit={handleSubmitReservation}>
				<RadioCardGroup
					options={options}
					onSelectionChange={handleReservationOptionChange}
					selectedOptionId={selectedReservationOption?.id}
				/>
				<div className="flex justify-center w-screen bg-[#ECEDEF]">
					<div className="w-full sm:w-2/3 md:1/2 py-12 px-12 max-w-[440px] md:px-8">
						<TextInput
							id="email-address"
							label="Email Address"
							placeholder="Enter your email address"
							value={email}
							onChange={handleEmailChange}
							error={reservationErrors.email}
							startIcon={<HiOutlineMail />}
							required
							className="mb-6"
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
		</section>
	);
};

export default ReservationForm;
