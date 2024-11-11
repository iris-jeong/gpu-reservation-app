import { FC, FormEvent, ReactNode } from 'react';

interface FormProps {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	children: ReactNode;
}

const Form: FC<FormProps> = ({ onSubmit, children }) => {
	return (
		<form className="grid" onSubmit={onSubmit}>
			{children}
		</form>
	);
};

export default Form;
