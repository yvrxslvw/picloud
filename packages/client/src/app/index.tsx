import { FC } from 'react';
import '@styles';
import { Button, Input, Logo } from 'shared/UI';

export const App: FC = () => {
	return (
		<>
			<Logo dark />
			<Button>Meow</Button>
			<Input label='Meow' placeholder='meow' type='text' />
			<Input label='Meow' placeholder='meow' type='password' />
		</>
	);
};
