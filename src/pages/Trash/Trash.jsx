import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { Fragment, useEffect, useState } from 'react'
import { FIRESTORE } from '../../firebase.config'
import { Box, Button, IconButton, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMyContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const Trash = () => {
    
    const[trashData , setTrashData] = useState([])

    useEffect(()=>{
       getTrashedMailFromServer()
    }, [])

    const temp = []

    const getTrashedMailFromServer = async() => {
       
        const docRef = query(collection(FIRESTORE , "AllMails") , 
        where('moveToTrash', "==" ,true))

        const fetchedData = await getDocs(docRef) ;
        
        fetchedData.forEach((doc) => {

            const data = {
                id : doc.id,
                info :doc.data()
            }

            if (!temp.some(item => item.id === data.id)) {
                temp.push(data);
            }

        }
        )

        setTrashData(temp)

    }

    const myContextUse = useMyContext()
    const navigate = useNavigate()
const{setMailContent , setMailViewOpen} = myContextUse
const openMailView = (mail) => {
    console.log(mail)
    navigate('/mail view')
    setMailViewOpen(true)
    setMailContent(mail)
}

  return (

   <>

{trashData?.map(mail => (
        <Fragment key={mail.id}>
            <Box className='mailTitleBox' 
            onClick={()=> 
                {openMailView(mail)}
            }
                >
            <Button><DeleteIcon sx={{color:'gray'}}/></Button>
                <Typography className='subject'>{mail.info.subject}</Typography>
                <Typography className='body'>{mail.info.body}</Typography>
            </Box>
        </Fragment>
    ))
    }
   
   
   
   </>
  )
}

export default Trash