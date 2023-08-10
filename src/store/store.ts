import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
// 	key: "root",
// 	storage,
// 	debug: true,
// 	blacklist: [],
// };
// const persistedReducer = persistReducer(persistConfig, reducers);
export type RootStates = ReturnType<typeof reducers>;
export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare({
			serializableCheck: false,
		}).concat(),
});

// export const persistor = persistStore(store);
// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
