'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react'; // Replace with your icon if needed
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';

interface DatePickerProps {
	label?: string;
	selectedDate: Date;
	onDateChange: (date: Date) => void;
}

export default function DatePicker({
	label,
	selectedDate,
	onDateChange,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="flex flex-col mb-4">
			{label && <label className="mb-1 text-sm">{label}</label>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={`w-[240px] justify-start text-left font-normal ${
							!selectedDate ? 'text-muted-foreground' : ''
						}`}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{selectedDate ? (
							format(selectedDate, 'PPP')
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="p-0">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={(date) => date && onDateChange(date)}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
