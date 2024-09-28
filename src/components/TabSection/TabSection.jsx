import React, { Fragment, useEffect, useState } from 'react';
import './TabSectionStyle.css';
import { getMailFromServer } from '../../redux/gmailSlice';
import MailComponent from '../MailComponent/MailComponent';
import { useDispatch, useSelector } from 'react-redux'

const TabSection = ({ collectionName }) => {

    const dispatch = useDispatch() ;
    useEffect(() => {
      dispatch(getMailFromServer(collectionName))
    }, []);



    const receivedMail = useSelector((state) => state.gmail.receivedMail);
    const response = useSelector((state) => state.gmail.response);
   

    return (
        <>
            <MailComponent receivedMailData = {receivedMail}/>
        </>
    );
};

export default TabSection;
