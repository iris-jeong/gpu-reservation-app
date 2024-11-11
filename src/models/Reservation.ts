import mongoose, { Schema, Document, Model } from 'mongoose';

export enum ReservationStatus {
	PENDING = 'pending',
	CONFIRMED = 'confirmed',
	CANCELED = 'canceled',
}

interface Reservation extends Document {
	email: string;
	gpuIds: mongoose.Types.ObjectId[];
	startDate: Date;
	endDate: Date;
	numberOfDays: number;
	status: ReservationStatus;
	createdAt: Date;
}

const ReservationSchema: Schema = new Schema(
	{
		email: { type: String, required: true },
		gpuIds: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Gpu', required: true },
		],
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		status: {
			type: String,
			enum: [
				ReservationStatus.PENDING,
				ReservationStatus.CONFIRMED,
				ReservationStatus.CANCELED,
			],
			default: ReservationStatus.PENDING,
			index: true,
		},
	},
	{ timestamps: true }
);

const Reservation: Model<Reservation> =
	mongoose.models.Reservation ||
	mongoose.model<Reservation>('Reservation', ReservationSchema);

export default Reservation;
