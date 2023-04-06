import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/other';

type registeredUserType = {
  first_name: string,
  last_name: string,
  email: string
}

type userState = {
  user: registeredUserType;
  isLoading: boolean;
  error: string | null;
}

export const registerUser = createAsyncThunk<registeredUserType, IUser, { rejectValue: string }>(
  'user/registerUser',
  async function (newUserData, { rejectWithValue }) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    // myHeaders.append("X-CSRFToken", "ukM6KLX5XwTXd1Nw76c4ta49sSSkZxCFXcVBKjRhIp1zQ84Zy0rBsTVceSKj5qjq");
    // myHeaders.append("Cookie", "csrftoken=ukM6KLX5XwTXd1Nw76c4ta49sSSkZxCFXcVBKjRhIp1zQ84Zy0rBsTVceSKj5qjq; sessionid=iagnot0ccj5tkzmwn0pwx98wp6d8pcgg");

    console.log(JSON.stringify(newUserData))

    const response = await fetch('http://localhost:8000/acounts/register/', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newUserData),
    });


    if (!response.ok) {
      return rejectWithValue('Can\'t add task. Server error.');
    }

    return (await response.json()) as registeredUserType;
  }
);

const initialState: userState = {
  user: {
    "email": "",
    "first_name": "",
    "last_name": "",
  },
  isLoading: false,
  error: null,
}

const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export default registerSlice.reducer;
