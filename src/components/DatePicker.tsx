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
	className: string;
	error?: string;
}

export default function DatePicker({
	label,
	selectedDate,
	onDateChange,
	className,
	error,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<div className={`flex flex-col mb-4 ${className}`}>
				{label && <label className="mb-1 text-sm">{label}</label>}
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={`py-[30px] justify-start text-left text-lg font-normal bg-[#F3F3F3]${
								!selectedDate ? 'text-muted-foreground' : ''
							}`}
						>
							<CalendarIcon className="mr-2 h-4 w-4 text-slate-900" />
							{selectedDate ? (
								format(selectedDate, 'PPP')
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent align="start" className="w-auto p-0">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={(date) => date && onDateChange(date)}
						/>
					</PopoverContent>
				</Popover>
			</div>
			{error && <small className="text-red-600">{error}</small>}
		</>
	);
}
