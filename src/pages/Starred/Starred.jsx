import React, { Fragment, useEffect } from 'react'

// import MailComponent from '../../components/MailComponent/MailComponent'

import { Box, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { getMailFromServer } from '../../redux/gmailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE } from '../../firebase.config';

const Starred = () => {

const receivedStarredMail = useSelector(state => state.gmail.receivedStarredMail);
console.log(receivedStarredMail)
 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMailFromServer("StarredMail"))
  }, []); 


  const removeStarredMail = async (id) => {
    await deleteDoc(doc(FIRESTORE, "StarredMail", id))
        .then(() => {
            alert("mail unstarred");
            dispatch(getMailFromServer("StarredMail"))
        }).catch(err => {
            console.log("Error ->", err);
        });
}

  return (


    <>
    {receivedStarredMail?.map(mail => (
      <Fragment key={mail.id}>
  <Box className='mailTitleBox'>
      <IconButton
          className='star-btn'
          onClick = {() => {removeStarredMail(mail.id)}}
      >
            <StarIcon className='star-icon-filled' />
      </IconButton>
      <Typography className='subject'>{mail.info.subject}</Typography>
      <Typography className='body'>{mail.info.body}</Typography>
  </Box>
</Fragment>
  ))
}</>
  )
}

export default Starred