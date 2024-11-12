export const validateGpuCount = (value: number) =>
	value > 0 ? '' : 'Invalid number of GPUs';

export const validateDate = (value: Date) =>
	!isNaN(value.getTime()) ? '' : 'Invalid date';

export const validateNumDays = (value: string) =>
	value.trim() === ''
		? 'Number of days is required'
		: isNaN(Number(value)) || Number(value) <= 0
		? 'Please enter a valid number of days'
		: '';

export const validateMaxPrice = (value: string) =>
	value.trim() === ''
		? 'Max average price is required'
		: isNaN(Number(value)) || Number(value) < 0
		? 'Please enter a valid price'
		: '';

export const validateEmail = (value: string) =>
	value.match(/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
		? ''
		: 'Invalid email address';
