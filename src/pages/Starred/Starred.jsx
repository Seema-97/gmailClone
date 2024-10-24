import React, { Fragment, useEffect } from 'react'

// import MailComponent from '../../components/MailComponent/MailComponent'

import { Box, IconButton, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { getStarredMailFromServer, updateStarMail } from '../../redux/gmailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context/context';


const Starred = () => {

const starredMail = useSelector(state => state.gmail.starredMail);
console.log(starredMail)
 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStarredMailFromServer())
    console.log('hii')
  }, []); 

  const toggleStar = (mail) => {
      const newIsStarred = !mail.info.isStarred;
      dispatch(updateStarMail({ mail, newIsStarred }));
      dispatch(getStarredMailFromServer())
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
    {starredMail?.map(mail => (
      <Fragment key={mail.id}>
  <Box className='mailTitleBox' onClick={()=> {openMailView(mail)}}>
      <IconButton
          className='star-btn'
          onClick = {() => {toggleStar(mail)}}
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