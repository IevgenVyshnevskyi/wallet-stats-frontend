import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, LoginFormData, LoginResponse, PasswordChangeFormData, RegisterFormData } from './types';
import { $api, CHANGE_USER_INFO_PATH, LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH, USER_DETAILS_PATH, userDataParsed, CHANGE_USER_PASSWORD_PATH } from '../api/api';
import { formatRegisterErrorMessage } from '../shared/utils/formatRegisterErrorMessage';
import { formatLoginErrorMessage } from './../shared/utils/formatLoginErrorMessage';

export type UserState = {
	user: IUser;
	isLoading: boolean;
	isLoggedIn: boolean;
	isLoggedOut: boolean;
	isRegistered: boolean;
	isAccountDeleted: boolean;
	isProfileChanged: boolean;
	isPasswordChanged: boolean;
	loginError: string | null;
	logoutError: string | null;
	getDetailsError: string | null;
	registerError: string | null;
	deleteUserAccountError: string | null;
	confirmEmailError: string | null;
	profileChangeError: string | null;
	passwordChangeError: string | null;
}

export const registerUser = createAsyncThunk<any, RegisterFormData, { rejectValue: string }>(
	'user/registerUser',
	async function (registerData, { rejectWithValue }) {
		return $api.post<IUser>(REGISTER_PATH, registerData)
			.then(res => {
				const user = res.data;
				localStorage.clear();
				localStorage.setItem('token', user.token);
				localStorage.setItem('userData', JSON.stringify(user));
				return user;
			})
			.catch(error => {
				return rejectWithValue("Акаунт із вказаною поштою вже існує");
			});
	}
);

export const loginUser = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
	'user/loginUser',
	async function (loginData, { rejectWithValue }) {
		return $api.post<LoginResponse>(LOGIN_PATH, loginData)
			.then(res => {
				const userInfo = res.data;
				localStorage.setItem('token', userInfo.token);
				localStorage.setItem("isDataEntrySuccess", "true");
				return userInfo;
			})
			.catch(error => {
				const errorMessage = formatLoginErrorMessage(error.response.data);
				return rejectWithValue('Будь ласка, введіть дані, вказані при реєстрації');
			});
	}
);

export const logoutUser = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
	'user/logoutUser',
	async function (_, { rejectWithValue }) {
		return $api.get(LOGOUT_PATH)
			.then(res => {
				localStorage.clear();
				return undefined;
			})
			.catch(error => {
				const errorMessage = formatRegisterErrorMessage(error.response.data);
				return rejectWithValue(errorMessage);
			});
	}
);

export const getUserDetails = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
	'user/getUserDetails',
	async function (_, { rejectWithValue }) {
		return $api.get(USER_DETAILS_PATH)
			.then(res => {
				localStorage.setItem('userData', JSON.stringify(res.data))
				return res.data
			})
			.catch(error => {
				const errorMessage = error.response.data;
				return rejectWithValue(errorMessage);
			});
	}
);

export const deleteUserAccount = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
	'user/deleteUserAccount',
	async function (_, { rejectWithValue }) {
		return $api.delete(USER_DETAILS_PATH)
			.then(res => {
				localStorage.clear();
				return undefined;
			})
			.catch(error => {
				const errorMessage = error.response.data;
				return rejectWithValue(errorMessage);
			});
	}
);

export const changeUserProfile = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
	'user/changeUserProfile',
	async function (payload, { rejectWithValue }) {
		return $api.put<IUser>(CHANGE_USER_INFO_PATH, payload)
			.then(newUserInfo => {
				localStorage.setItem('userData', JSON.stringify({
					...userDataParsed,
					...newUserInfo.data
				}));
				return newUserInfo.data;
			})
			.catch(error => {
				return rejectWithValue('Помилка');
			});
	}
);

export const changeUserPassword = createAsyncThunk<
	{ old_password: string },
	PasswordChangeFormData,
	{ rejectValue: string }
>(
	'user/changeUserPassword',
	async function (payload, { rejectWithValue }) {
		return $api.post(CHANGE_USER_PASSWORD_PATH, payload)
			.then(res => res?.data)
			.catch(error => rejectWithValue('Помилка'));
	}
);

const initialState: UserState = {
	user: null,
	isLoading: false,
	isRegistered: false,
	isLoggedIn: false,
	isLoggedOut: false,
	isAccountDeleted: false,
	isProfileChanged: false,
	isPasswordChanged: false,
	registerError: null,
	loginError: null,
	logoutError: null,
	getDetailsError: null,
	deleteUserAccountError: null,
	confirmEmailError: null,
	profileChangeError: null,
	passwordChangeError: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetUserState: () => {
			return initialState;
		},
		resetDeleteUserAccountError: (state) => {
			state.deleteUserAccountError = null;
		},
		resetProfileEditErrors: (state) => {
			state.profileChangeError = null;
			state.passwordChangeError = null;
		},
		setSuccessStatus: (state, action) => {
			state.isProfileChanged = action.payload;
			state.isPasswordChanged = action.payload;
		},
		setIsLoggedOut: (state, action) => {
			state.isLoggedOut = action.payload;
		},
		setIsAccountDeleted: (state, action) => {
			state.isAccountDeleted = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.registerError = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoading = false;
				state.isLoggedOut = false;
				state.isRegistered = true;
				state.isAccountDeleted = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.registerError = action.payload;
				state.isLoading = false;
			})

			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = {
					...state.user,
					...action.payload
				}
				state.isLoading = false;
				state.isLoggedOut = false;
				state.isAccountDeleted = false;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.loginError = action.payload;
			})

			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.isLoggedOut = true;
				state.isRegistered = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.logoutError = action.payload;
			})

			.addCase(getUserDetails.pending, (state) => {
				state.isLoading = true;
				state.getDetailsError = null;
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.user = {
					...state.user,
					...action.payload
				};
				state.isLoading = false;
				state.getDetailsError = null;
			})
			.addCase(getUserDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.getDetailsError = action.payload;
			})

			.addCase(deleteUserAccount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUserAccount.fulfilled, (state) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.isRegistered = false;
				state.isAccountDeleted = true;
			})
			.addCase(deleteUserAccount.rejected, (state, action) => {
				state.isLoading = false;
				state.deleteUserAccountError = action.payload;
			})

			.addCase(changeUserProfile.pending, (state) => {
				state.isLoading = true;
				state.profileChangeError = null;
			})
			.addCase(changeUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = {
					...state.user,
					...action.payload
				};
				state.isProfileChanged = true;
			})
			.addCase(changeUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.profileChangeError = action.payload
			})

			.addCase(changeUserPassword.pending, (state) => {
				state.isLoading = true;
				state.passwordChangeError = null;
			})
			.addCase(changeUserPassword.fulfilled, (state) => {
				state.isLoading = false;
				state.isPasswordChanged = true;
			})
			.addCase(changeUserPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.passwordChangeError = action.payload
			})
	}
});

export const {
	resetUserState,
	resetDeleteUserAccountError,
	setSuccessStatus,
	resetProfileEditErrors,
	setIsLoggedOut,
	setIsAccountDeleted,
} = userSlice.actions;

export default userSlice.reducer;