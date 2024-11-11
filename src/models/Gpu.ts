import mongoose, { Schema, Document, Model } from 'mongoose';

export enum GpuStatus {
	AVAILABLE = 'available',
	RESERVED = 'reserved',
}

interface Gpu extends Document {
	uuid: string;
	modelType: string;
	status: GpuStatus;
	rentalStart?: Date;
	rentalEnd?: Date;
}

const GpuSchema: Schema = new Schema({
	uuid: { type: String, required: true, unique: true },
	modelType: { type: String, required: true },
	status: {
		type: String,
		enum: [GpuStatus.AVAILABLE, GpuStatus.RESERVED],
		default: GpuStatus.AVAILABLE,
		index: true,
	},
	rentalStart: { type: Date, required: false },
	rentalEnd: { type: Date, required: false },
});

const Gpu: Model<Gpu> =
	mongoose.models.Gpu || mongoose.model<Gpu>('Gpu', GpuSchema);

export default Gpu;
