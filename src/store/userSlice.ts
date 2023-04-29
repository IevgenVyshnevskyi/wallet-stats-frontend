import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, LoginFormData, LoginResponse, RegisterFormData } from './types';
import { $api, LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH, USER_DETAILS_PATH } from '../api/api';
import { formatRegisterErrorMessage } from '../shared/utils/formatRegisterErrorMessage';
import { formatLoginErrorMessage } from './../shared/utils/formatLoginErrorMessage';

export type UserState = {
    user: IUser;
    isLoading: boolean;
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    isRegistered: boolean;
    isAccountDeleted: boolean;
    loginError: string | null;
    logoutError: string | null;
    getDetailsError: string | null;
    registerError: string | null;
    deleteUserAccountError: string | null;
    confirmEmailError: string | null;
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
                const errorMessage = formatRegisterErrorMessage(error.response.data);
                return rejectWithValue(errorMessage);
            });
    }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
    'user/loginUser',
    async function (loginData, { rejectWithValue }) {
        return $api.post(LOGIN_PATH, loginData)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('token', token);
                return token;
            })
            .catch(error => {
                const errorMessage = formatLoginErrorMessage(error.response.data);
                return rejectWithValue(errorMessage);
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

export const confirmEmail = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
    'user/confirmEmail',
    async function (_, { rejectWithValue }) {
        return $api.delete(USER_DETAILS_PATH)
            .then(res => res.data)
            .catch(error => {
                const errorMessage = error.response.data;
                return rejectWithValue(errorMessage);
            });
    }
);

const initialState: UserState = {
    user: null,
    isLoading: false,
    isRegistered: false,
    isLoggedIn: false,
    isLoggedOut: false,
    isAccountDeleted: false,
    registerError: null,
    loginError: null,
    logoutError: null,
    getDetailsError: null,
    deleteUserAccountError: null,
    confirmEmailError: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: (state) => {
            return initialState;
        },
        resetDeleteUserAccountError: (state) => {
            state.deleteUserAccountError = null;
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
                state.isAccountDeleted = false;
                state.isRegistered = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerError = action.payload;
                state.isLoading = false;
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
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
                state.isRegistered = false;
                state.user = null;
                state.isLoggedOut = true;
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

            .addCase(confirmEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirmEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(confirmEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.confirmEmailError = action.payload;
            })
    }
});

export const {
    resetUserState,
    resetDeleteUserAccountError
} = userSlice.actions;

export default userSlice.reducer;