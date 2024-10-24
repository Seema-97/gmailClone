
import { Box, IconButton, Typography } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Fragment, useEffect, useState } from "react";
import { getMailFromServer, updateStarMail } from '../../redux/gmailSlice';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../context/context';


const AllMail = ({ filterType }) => {
   
    const[receivedAllMails , setReceivedAllMails] = useState([])
     
    useEffect(() => {
      getAllMailsFromSever() 
    }, []);

    const getAllMailsFromSever = async() =>{
        const fetchedData = await getDocs(collection(FIRESTORE , 'AllMails'));
        let temp = []
        fetchedData.forEach(doc => {
        const data ={
             id : doc.id,
             info : doc.data()
         }
         temp.push(data)
        } 
     )
     setReceivedAllMails(temp)    
    }

    const toggleStar = (mail) => {
        const newIsStarred = !mail.info.isStarred; // Calculate new state value
        dispatch(updateStarMail({ mail, newIsStarred }));
        dispatch(getMailFromServer(filterType))
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

            {receivedAllMails?.map(mail => (
                <Fragment key={mail.id}>
                    <Box className='mailTitleBox' onClick={() => {openMailView(mail)}}>
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

export default AllMail