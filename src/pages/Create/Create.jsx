import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFormSubmit, handleInputChange } from "../../redux/gmailSlice";

const sectionName = ["primary", "promotion", "social"];


  
const Create = () => {
  // const isStarred = useSelector(state => state.gmail.isStarred);
  // const isStarBtnClicked = useSelector(state => state.gmail.isStarBtnClicked
  // ) 
  // const starredMails = useSelector(state => state.gmail.starredMails)
  // console.log('starred mail ' + starredMails)

  // console.log('star btn is clicked')
  // console.log(`is starred state is ${isStarred}`)

  const dispatch = useDispatch()
  const inputData = useSelector(state => state.gmail.inputData)

  // const [inputData, setInputData] = useState({
  //   sectionName: "",
  //   subject: "",
  //   body: "",
  //   senderEmailAddress:"",
  //   receiverEmailAddress: "",
  //   isStarred: isStarred
  // });

  // const clearForm = () => {
  //   setInputData({
  //     sectionName: "",
  //     subject: "",
  //     body: "",
  //     senderEmailAddress:"",
  //     receiverEmailAddress: ""
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputChange({ name, value }))
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    dispatch(handleFormSubmit(inputData))
    // console.log(inputData);
 
    //   if (isStarBtnClicked) {
    //     await updateDoc(doc(FIRESTORE, "AllMails", starredMails), {
    //         ...inputData,
    //     }).then(() => {
    //         alert("Updated");
    //         clearForm();
    //         setIsUpdating(false);
    //     }).catch(err => {
    //         console.log(err);
    //     })

    //     console.log('star btn is clicked')
    //     console.log(`is starred state is ${isStarred}`)


    // } else {
    //   await addDoc(collection(FIRESTORE, "AllMails"), {
    //     ...inputData,
    //   })
    //     .then(() => {
    //       alert("Submitted");
    //       clearForm();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  
    //    console.log('star button is not clicked')
    //    console.log(`is starred state is ${isStarred}`)
    // }

   
    
  };

  return (
    <>
      <form>
        {sectionName.map((section) => (
          <Fragment key={section}>
            <input
              type="radio"
              placeholder="Enter section name"
              name="sectionName"
              onChange={handleChange}
              value={section}
      
            />
            {section}
          </Fragment>
        ))}
       <br />
        <input
          type="text"
          placeholder="Enter subject"
          name="subject"
          onChange={handleChange}
        
        />
        <br />
       <label/>Enter mail body :
        <textarea rows={5} cols={90}  
          name="body"
          onChange={handleChange}
         
         />
         <input type='email' placeholder="sender"  name="senderEmailAddress"  onChange={handleChange}/>
         <br/>
         <input type='email' placeholder="receiver" name="receiverEmailAddress"  onChange={handleChange}/>
        <br />
        <button onClick={handleSubmitBtn}>Submit</button>
      </form>
    </>
  );
};

export default Create;
