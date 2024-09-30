// import React, { Fragment, useEffect, useState } from 'react';
import './TabSectionStyle.css';
// import { getMailFromServer } from '../../redux/gmailSlice';
import MailComponent from '../MailComponent/MailComponent';
// import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
const TabSection = ({ filterType }) => {

    return (
        <>
            <MailComponent filterType={filterType} />
        </>
    );
};

export default TabSection;
