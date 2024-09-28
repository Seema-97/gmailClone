import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE } from "../../firebase.config";
import React, { Fragment, useState } from "react";

const sectionName = ["primary", "promotion", "social"];

const Create = () => {
  const [inputData, setInputData] = useState({
    sectionName: "",
    subject: "",
    body: "",
  });

  const clearForm = () => {
    setInputData({
      sectionName: "",
      subject: "",
      body: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(inputData);
    clearForm();

    if (inputData.sectionName === "primary") {
      await addDoc(collection(FIRESTORE, "PrimaryMail"), {
        ...inputData,
      })
        .then(() => {
          alert("Submitted");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("primary");
    } else if (inputData.sectionName === "promotions") {
      await addDoc(collection(FIRESTORE, "PromotionsMail"), {
        ...inputData,
      })
        .then(() => {
          alert("Submitted");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("promotions");
    } else if (inputData.sectionName === "social") {
      await addDoc(collection(FIRESTORE, "SocialMail"), {
        ...inputData,
      })
        .then(() => {
          alert("Submitted");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("social");
    }
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
              checked = {inputData.sectionName === section}
            />
            {section}
          </Fragment>
        ))}
        <br></br>
        <input
          type="text"
          placeholder="Enter subject"
          name="subject"
          onChange={handleChange}
          value={inputData.subject}
        />
        <br></br>
        <input
          type="text"
          placeholder="Enter body"
          name="body"
          onChange={handleChange}
          value={inputData.body}
        />
        <br></br>
        <button onClick={handleFormSubmit}>Submit</button>
      </form>
    </>
  );
};

export default Create;
