import React from 'react';
import Form from '@/components/Form';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import DatePicker from '@/components/DatePicker';
import TextInput from '@/components/TextInput';
import { Button } from '@/components/Button';
import { FaDollarSign } from 'react-icons/fa6';

interface AvailabilityFormProps {
	gpuCount: number;
	selectedDate: Date;
	numDays: string;
	maxPrice: string;
	availabilityErrors: Record<string, string>;
	handleGpuCountChange: (value: number) => void;
	handleDateChange: (date: Date) => void;
	handleNumDaysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCheckAvailability: (e: React.FormEvent) => Promise<void>;
	isAvailabilityValid: boolean;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
	gpuCount,
	selectedDate,
	numDays,
	maxPrice,
	availabilityErrors,
	handleGpuCountChange,
	handleDateChange,
	handleNumDaysChange,
	handleMaxPriceChange,
	handleCheckAvailability,
	isAvailabilityValid,
}) => {
	return (
		<section
			aria-labelledby="availability-section"
			className="font-[family-name:var(--font-geist-sans)]"
		>
			<h3 id="availability-section" className="sr-only">
				Check GPU Availability
			</h3>
			<Form onSubmit={handleCheckAvailability}>
				<div className="grid grid-cols-1 mb-[-8px]">
					<ToggleButtonGroup
						label="# of GPUs"
						options={[1, 2, 3, 4, 5, 6, 7, 8]}
						onChange={handleGpuCountChange}
						selectedOption={gpuCount}
						error={availabilityErrors.gpuCount || ''}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 space-y-4 sm:space-y-0 gap-1 sm:gap-4 md:gap-8">
					<DatePicker
						selectedDate={selectedDate}
						onDateChange={handleDateChange}
						label="Start Date"
						className="md:col-span-2"
					/>
					<TextInput
						label="# of Days"
						id="numDays"
						value={numDays}
						onChange={handleNumDaysChange}
						endIcon={numDays === '1' ? 'day' : 'days'}
						className="md:col-span-1"
						error={availabilityErrors.numDays || ''}
						required
					/>
				</div>

				<div className="grid grid-cols-1">
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
					className="mt-10"
				>
					Check Availability
				</Button>
			</Form>
		</section>
	);
};

export default AvailabilityForm;
