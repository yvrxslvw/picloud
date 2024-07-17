import { FC } from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from 'pages/index';
import { SetupStore } from './store';
import '@styles';

const store = SetupStore();

export const App: FC = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};
