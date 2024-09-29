import React, { Fragment, useEffect, useState } from 'react';
import './TabSectionStyle.css';
import { getMailFromServer } from '../../redux/gmailSlice';
import MailComponent from '../MailComponent/MailComponent';
import { useDispatch, useSelector } from 'react-redux'

const TabSection = ({ filterType }) => {

    const dispatch = useDispatch() ;
    useEffect(() => {
      dispatch(getMailFromServer(filterType))
    }, []);


    const receivedMail = useSelector((state) => state.gmail.receivedMail);
    return (
        <>
            <MailComponent receivedMailData = {receivedMail}/>
        </>
    );
};

export default TabSection;
