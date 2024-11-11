import { FC, FormEvent, ReactNode } from 'react';

interface FormProps {
	onSubmit: () => void;
	children: ReactNode;
}

const Form: FC<FormProps> = ({ onSubmit, children }) => {
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit();
	};

	return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
