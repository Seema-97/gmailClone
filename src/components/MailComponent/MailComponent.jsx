import React, { useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Fragment } from "react";
import { handleIsStarred, updateStarMail } from '../../redux/gmailSlice';
import { useDispatch, useSelector} from 'react-redux';



const MailComponent = ({receivedMailData }) => {

    const dispatch = useDispatch()
    const isStarred = useSelector(state => state.gmail.isStarred)
   const toggleStar = (mail) => {
    const newIsStarred = !isStarred; // Calculate new state value
     dispatch(handleIsStarred()); // Update the state in Redux
     dispatch(updateStarMail({ mail, newIsStarred }));
    }

    console.log(isStarred)

  return (
   <>

    {receivedMailData?.map(mail => (
        <Fragment key={mail.id}>
    <Box className='mailTitleBox'>
        <IconButton
            className='star-btn'
            onClick={() => toggleStar(mail)}
        >
            {mail.info.isStarred === true ?  <StarIcon className='star-icon-filled'/> : <StarOutlineIcon className='star-icon-outlined'/> }
        </IconButton>
        <Typography className='subject'>{mail.info.subject}</Typography>
        <Typography className='body'>{mail.info.body}</Typography>
    </Box>
</Fragment>
    ))
}
       
       </>       
  )
}

export default MailComponent