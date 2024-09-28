import React, { useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Fragment } from "react";
import { postStarredMail } from '../../redux/gmailSlice';
import { useDispatch} from 'react-redux';



const MailComponent = ({receivedMailData }) => {

    const dispatch = useDispatch()
   const handleStarredMail = (mail) => {
      dispatch(postStarredMail(mail))
        console.log(mail.info)
    }


  return (
   <>
  
  
    {receivedMailData?.map(mail => (
        <Fragment key={mail.id}>
    <Box className='mailTitleBox'>
        <IconButton
            className='star-btn'
            onClick={() => handleStarredMail(mail)}
        >
             <StarOutlineIcon className='star-icon-outlined'/> 
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