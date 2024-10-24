import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { FIRESTORE } from "../../firebase.config";
import { Box, IconButton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useDispatch } from "react-redux";
import { updateStarMail } from "../../redux/gmailSlice";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/context";

const SendEmail = () => {
  const [sentMail, setSentMail] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    getSentMailFromServer();
  }, []);

  const getSentMailFromServer = async () => {
    let temp = [];
    const docRef = query(
      collection(FIRESTORE, "AllMails"),
      where("isSent", "==", true)
    );
    const fetchedDoc = await getDocs(docRef);
    fetchedDoc.forEach((doc) => {
      let data = {
        id: doc.id,
        info: doc.data(),
      };
      temp.push(data);
    });
    setSentMail(temp);
  };

  const toggleStar = (mail) => {
    const newIsStarred = !mail.info.isStarred; // Calculate new state value
    dispatch(updateStarMail({ mail, newIsStarred }));
    getSentMailFromServer()
}

const navigate = useNavigate()

const myContextUse = useMyContext()
const{setMailContent , setMailViewOpen} = myContextUse
const openMailView = (mail) => {
    console.log(mail)
    navigate('/mail view')
    setMailViewOpen(true)
    setMailContent(mail)
}

  return (
    <>
      {sentMail?.map((mail) => (
        <Fragment key={mail.id}>
          <Box className="mailTitleBox" onClick={()=> {openMailView(mail)}}>
            <IconButton className="star-btn" 
            onClick={() => toggleStar(mail)}
            >
              {mail.info.isStarred === true ? (
                <StarIcon className="star-icon-filled" />
              ) : (
                <StarOutlineIcon className="star-icon-outlined" />
              )}
            </IconButton>
            <Typography className="subject">{mail.info.firstName}</Typography>
            <Typography className="body">{mail.info.subject}</Typography>
          </Box>
        </Fragment>
      ))}
    </>
  );
};

export default SendEmail;
