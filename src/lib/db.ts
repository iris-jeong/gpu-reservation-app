import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
	throw new Error('Invalid/missing environment variable: MONGODB_URI');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

async function connectToDB() {
	if (mongoose.connection.readyState >= 1) {
		return; // Already connected.
	}

	try {
		console.log('Attempting to connect to MongoDB...');
		await mongoose
			.connect(MONGODB_URI)
			.then(() => console.log(`Connected to ${MONGODB_URI}...`))
			.catch(() => console.log("Couldn't connect"));
	} catch (error) {
		console.error("Couldn't connect to MongoDB:", error);
	}
}

export default connectToDB;
