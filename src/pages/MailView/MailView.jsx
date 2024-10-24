import React, { Fragment } from 'react'
import { useMyContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import { Box, Button} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './MailView.css'
import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE } from '../../firebase.config';

const MailView = () => {

    const myContextUse = useMyContext()
    const{mailContent , setMailViewOpen} = myContextUse
    const navigate = useNavigate();

    const handleBackButton = () => {
        setMailViewOpen(false)
        navigate(-1)
    }

    const handleTrash = async(mailContent) => {
        await updateDoc(doc(FIRESTORE , 'AllMails' , mailContent.id) , {
            ...mailContent.info,
            moveToTrash : true
        }).then(() => alert('moved to trash')).catch(err => console.log(err))
    }

    console.log(mailContent)
  return (

        <Fragment>
          <Box className="mail-content-box">
            <Box>
                <Button onClick={handleBackButton}><KeyboardBackspaceIcon sx={{color:'gray'}}/></Button>
                <Button onClick={() => {handleTrash(mailContent)}}><DeleteIcon sx={{color:'gray'}}/></Button>
            </Box>
           
            <h2>{mailContent.info.subject}</h2>

            <div className='mail-id-info'>
           <AccountCircleIcon className='person-icon'/>
            <p className='mail-id'><span className='username'>{mailContent.info.senderEmailAddress.split("@")[0]}</span>{`<${mailContent.info.senderEmailAddress}>`}</p>
            </div>

            <p >{mailContent.info.body}</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur quos culpa tempora, ex asperiores ullam dicta iusto iste similique fugit dolorem saepe deserunt pariatur laborum impedit aliquid quod dolore exercitationem tenetur qui. Amet, ipsa. Reiciendis vitae ex asperiores facere consequuntur consequatur nulla quam similique perspiciatis, eveniet officiis! Beatae, sapiente eos!</p>
          </Box>
        </Fragment>
  
  )
}

export default MailView