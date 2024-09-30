import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, query, where, updateDoc, doc, } from "firebase/firestore";
import { FIRESTORE } from "../firebase.config";

const initialState = {
  receivedMail: [],
  getResponse: null,
  postResponse: null,
  updateResponse: null,
  getStarredResponse: null,
  isStarred: false,
  inputData: {
  },
  starredMail: []

};

export const getMailFromServer = createAsyncThunk(
  "gmail/getMailFromServer",
  async (filterType) => {

    let temp = [];
    const docRef = query(collection(FIRESTORE, "AllMails"),
      where("sectionName", '==', filterType)
    )
    const fetchedDoc = await getDocs(docRef);

    fetchedDoc.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };
      temp.push(data);
    });

    console.log(temp);
    return temp;
  }
);


export const getStarredMailFromServer = createAsyncThunk(
  "gmail/getMStarredMailFromServer",
  async () => {

    let temp = [];
    const docRef = query(collection(FIRESTORE, "AllMails"),
      where("isStarred", '==', true))
    const fetchedDoc = await getDocs(docRef);
    fetchedDoc.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };
      temp.push(data);
    });

    console.log(temp);
    return temp;
  }
);


export const handleFormSubmit = createAsyncThunk(
  "gmail/handleFormSubmit",
  async (inputData) => {
    await addDoc(collection(FIRESTORE, "AllMails"), {
      ...inputData
    })
      .then(() => {
        alert("Submitted");
        // clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  })

export const updateStarMail = createAsyncThunk(
  "gmail/updateStarMail",
  async ({ mail, newIsStarred }) => {
    console.log(mail)
    console.log(mail.id)
    await updateDoc(doc(FIRESTORE, "AllMails", mail.id), {
      ...mail.info,
      isStarred: newIsStarred,
    }).then(() => {
      alert("Updated");
    }).catch(err => {
      console.log(err);
    });
  }
);

export const gmailSlice = createSlice({
  name: "gmail",
  initialState,
  reducers: {

    handleInputChange: (state, action) => {
      state.inputData = {
        ...state.inputData,
        isStarred: state.isStarred,
        [action.payload?.name]: action.payload?.value

      }
      // console.log(state.inputData)
    },
    // handleIsStarred: (state, action) => {
    //   state.isStarred = action.payload.newIsStarred;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMailFromServer.pending, (state) => {
        state.getResponse = "loading";
      })
      .addCase(getMailFromServer.fulfilled, (state, action) => {
        console.log(action);
        state.getResponse = "succeeded";
        state.receivedMail = action.payload; // Save the fetched data to receivedMail

      })
      .addCase(getMailFromServer.rejected, (state, action) => {
        state.getResponse = "failed";
      });

    builder
      .addCase(handleFormSubmit.pending, (state) => {
        state.postResponse = "loading";
      })
      .addCase(handleFormSubmit.fulfilled, (state, action) => {
        console.log(action);
        state.postResponse = "succeeded";
      })
      .addCase(handleFormSubmit.rejected, (state, action) => {
        state.postResponse = "failed";
      });

    builder
      .addCase(updateStarMail.pending, (state) => {
        state.updateResponse = "loading";
      })
      .addCase(updateStarMail.fulfilled, (state, action) => {
        state.updateResponse = "succeeded";
      })
      .addCase(updateStarMail.rejected, (state, action) => {
        state.updateResponse = "failed";
      });

    builder
      .addCase(getStarredMailFromServer.pending, (state) => {
        state.getStarredResponse = "loading";
      })
      .addCase(getStarredMailFromServer.fulfilled, (state, action) => {
        console.log(action);
        state.getStarredResponse = "succeeded";
        state.starredMail = action.payload;
      })
      .addCase(getStarredMailFromServer.rejected, (state, action) => {
        state.getStarredResponse = "failed";
      });

  },
});

export const { handleIsStarred, handleInputChange } = gmailSlice.actions;

export default gmailSlice.reducer;
