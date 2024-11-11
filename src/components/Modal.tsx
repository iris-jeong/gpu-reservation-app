import { FC, ReactNode, useEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	// Close the modal when user clicks outside of it.
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			if (isOpen) {
				document.removeEventListener('mousedown', handleClickOutside);
			}
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			{/* Overlay */}
			<div className="absolute inset-0 bg-black opacity-50"></div>

			{/* Modal Content */}
			<div
				ref={modalRef}
				className={`fixed bottom-0 p-6 bg-[#CDCDCD] rounded shadow-lg w-full`}
			>
				<button
					className="absolute top-2 right-2 text-gray-500 hover: text-gray-700"
					onClick={onClose}
				>
					<CgClose />
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
