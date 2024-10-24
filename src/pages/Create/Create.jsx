import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFormSubmit, handleInputChange } from "../../redux/gmailSlice";

const sectionName = ["primary", "promotion", "social"];


  
const Create = () => {


  const dispatch = useDispatch()
  const inputData = useSelector(state => state.gmail.inputData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputChange({ name, value }))
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    dispatch(handleFormSubmit(inputData))   
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
