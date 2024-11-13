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
					<div className="w-full py-12 px-2 max-w-[500px]">
						<TextInput
							id="email-address"
							label="Email Address"
							placeholder="hello@gmail.com"
							value={email}
							onChange={handleEmailChange}
							error={reservationErrors.email}
							startIcon={<HiOutlineMail />}
							required
							className="mb-6 sm:w-[500px]"
							inputClass="bg-white border-[#DCDCDC]"
						/>
						<Button
							type="submit"
							isLoading={false}
							disabled={!isReservationValid}
							className="sm:w-[500px]"
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
