import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./ModalComponent.css"
import { handleIsStarred } from '../../redux/gmailSlice';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE } from '../../firebase.config';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 410,
  height:520,
  bgcolor: 'background.paper',
  borderRadius: "18px",
  boxShadow: 24,

};

export default function ModalComponent({open, handleClose}) {

    const[composeMailData , setComposeMailData] = React.useState({
        receiverEmailAddress : '' ,
        senderEmailAddress : 'seema@gmail.com',
        subject:"",
        body :"",
        isStarred :false,
        isSent: true,
    })

    const firstName = composeMailData.receiverEmailAddress?.split('@')[0]

    const handleChange = (e) => {
        const{name,value} = e.target
        setComposeMailData(prev => {
            return{
                ...prev,
                [name] : value
            }
        })
    }
   
    const handleComposeForm = async(e) => {
       e.preventDefault();
       console.log(composeMailData) ;
       await addDoc(collection(FIRESTORE, "AllMails"), {
        ...composeMailData,
        firstName : firstName
       })
         .then(() => {
           alert("Submitted");
           // clearForm();
         })
         .catch((err) => {
           console.log(err);
         });
    }



  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box className="modal-header-box"> <Typography id="modal-modal-title" component="h2" className='modal-title'> New Message</Typography>
            <Button onClick={handleClose}>x</Button>
          </Box>
            
        <form className='form' >
        <input type="email" placeholder='Recipients' name='receiverEmailAddress' onChange={handleChange}/>
        <input type="text" placeholder='Subject' name='subject' onChange={handleChange}/>
        <textarea id="" rows={15} cols={50} name='body' onChange={handleChange}></textarea>
        <Button variant='contained' onClick={handleComposeForm}>Send</Button>
         </form >

        </Box>
      </Modal>
    </div>
  );
}
