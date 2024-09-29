import React, { Fragment, useEffect } from 'react'

// import MailComponent from '../../components/MailComponent/MailComponent'

import { Box, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { getStarredMailFromServer } from '../../redux/gmailSlice';
import { useDispatch, useSelector } from 'react-redux';


const Starred = () => {

const starredMail = useSelector(state => state.gmail.starredMail);
console.log(starredMail)
 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStarredMailFromServer())
    console.log('hii')
  }, []); 


  return (


    <>
    {starredMail?.map(mail => (
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