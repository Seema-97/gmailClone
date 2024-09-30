// import React, { useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Fragment, useEffect } from "react";
import { getMailFromServer, updateStarMail } from '../../redux/gmailSlice';
import { useDispatch, useSelector } from 'react-redux';



// eslint-disable-next-line react/prop-types
const MailComponent = ({ filterType }) => {
    const receivedMailData = useSelector((state) => state.gmail.receivedMail);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMailFromServer(filterType))
    }, []);

    // const isStarred = useSelector(state => state.gmail.isStarred)
    const toggleStar = (mail) => {
        const newIsStarred = !mail.info.isStarred; // Calculate new state value
        // dispatch(handleIsStarred({ newIsStarred })); // Update the state in Redux
        dispatch(updateStarMail({ mail, newIsStarred }));
        dispatch(getMailFromServer(filterType))
    }



    // console.log(isStarred)

    return (
        <>

            {receivedMailData?.map(mail => (
                <Fragment key={mail.id}>
                    <Box className='mailTitleBox'>
                        <IconButton
                            className='star-btn'
                            onClick={() => toggleStar(mail)}
                        >
                            {mail.info.isStarred === true ? <StarIcon className='star-icon-filled' /> : <StarOutlineIcon className='star-icon-outlined' />}
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