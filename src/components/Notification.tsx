import { FC, useEffect } from 'react';

interface NotificationProps {
	message: string;
	onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ message, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slideInUp">
			{message}
		</div>
	);
};

export default Notification;
