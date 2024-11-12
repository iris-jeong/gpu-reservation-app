import { FC, FormEvent, ReactNode } from 'react';

interface FormProps {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	children: ReactNode;
}

const Form: FC<FormProps> = ({ onSubmit, children }) => {
	return (
		<form className="grid space-y-6" onSubmit={onSubmit}>
			{children}
		</form>
	);
};

export default Form;
