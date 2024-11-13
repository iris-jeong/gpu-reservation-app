import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState<boolean>(isOpen);

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		} else {
			// Delay the unmounting to allow the slide-out animation to complete.
			setTimeout(() => {
				setIsVisible(false);
			}, 300);
		}
	}, [isOpen]);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		},
		[onClose]
	);

	// Close the modal when user clicks outside of it.
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			if (isOpen) {
				document.removeEventListener('mousedown', handleClickOutside);
			}
		};
	}, [isOpen, handleClickOutside]);

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className={`absolute inset-0 bg-black opacity-50`}></div>

			<div
				ref={modalRef}
				className={`${
					isOpen ? 'animate-slideInUp' : 'animate-slideOutDown'
				} fixed bottom-0 bg-[#CDCDCD] rounded shadow-lg`}
				role="dialog"
				aria-modal="true"
				tab-index={-1}
			>
				<button
					className="absolute top-2 right-2 text-gray-500 hover: text-gray-700 text-3xl"
					onClick={onClose}
					aria-label="Close modal"
				>
					<CgClose />
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
