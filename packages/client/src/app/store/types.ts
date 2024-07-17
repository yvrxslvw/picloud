import { RootReducer } from './RootReducer';
import { SetupStore } from './SetupStore';

type AppStore = ReturnType<typeof SetupStore>;
export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = AppStore['dispatch'];
