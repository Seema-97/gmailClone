import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FIRESTORE } from "../firebase.config";

const initialState = {
  receivedMail: [],
  receivedStarredMail: [],
  response: null,
  starredResponse: null,
  starredMail : []
};

export const getMailFromServer = createAsyncThunk(
  "gmail/getMailFromServer",
  async (collectionName) => {
    const response = await getDocs(collection(FIRESTORE, collectionName));
    let temp = [];
    console.log(collectionName);
    response.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };
      temp.push(data);
    });

    console.log(temp);
    return temp; // Return temp instead of data()
  }
);

export const postStarredMail = createAsyncThunk(
  "gmail/postStarredMail",
  async (mail) => {
    const temp = []
    await addDoc(collection(FIRESTORE, "StarredMail"), {
      ...mail.info,
    }).then(() => {
        alert('mail starred')
        temp.push({...mail.info})
      })
      .catch((err) => console.log(err));
      console.log(temp)
      return temp ;
  } 
);

export const gmailSlice = createSlice({
  name: "gmail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMailFromServer.pending, (state) => {
        state.response = "loading";
      })
      .addCase(getMailFromServer.fulfilled, (state, action) => {
        console.log(action);
        state.response = "succeeded";
        state.receivedMail = action.payload; // Save the fetched data to receivedMail
        if (action.meta.arg === "StarredMail") {
          state.receivedStarredMail = action.payload; // Save the fetched data to receivedStarredMail
        }
      })
      .addCase(getMailFromServer.rejected, (state, action) => {
        state.response = "failed";
      });

    builder
      .addCase(postStarredMail.pending, (state) => {
        state.starredResponse = "loading";
      })
      .addCase(postStarredMail.fulfilled, (state, action) => {
        console.log(action);
        state.starredResponse = "succeeded";
        state.starredMail += action.payload
      })
      .addCase(postStarredMail.rejected, (state, action) => {
        state.starredResponse = "failed";
      });
  },
});

export default gmailSlice.reducer;
