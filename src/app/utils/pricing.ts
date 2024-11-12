export const pricingTiers = [
	{ minAvailable: 80, pricePerDay: 5 }, // 80 or more GPUs available
	{ minAvailable: 60, pricePerDay: 10 }, // 60-79 GPUs available
	{ minAvailable: 40, pricePerDay: 15 }, // 40-59 GPUs available
	{ minAvailable: 20, pricePerDay: 20 }, // 20-39 GPUs available
	{ minAvailable: 1, pricePerDay: 25 }, // 1-19 GPUs available
];

// Calculate price per day based on the count of available GPUs.
export function calculatePricePerDay(availableCount: number): number {
	// Find the first tier where availableCount meets or exceeds minAvailable.
	const tier = pricingTiers.find((t) => availableCount >= t.minAvailable);
	return tier
		? tier.pricePerDay
		: pricingTiers[pricingTiers.length - 1].pricePerDay;
}
