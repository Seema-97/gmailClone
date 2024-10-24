
import './TabSectionStyle.css';

import MailComponent from '../MailComponent/MailComponent';

const TabSection = ({ filterType }) => {

    return (
        <>
            <MailComponent filterType={filterType} />
        </>
    );
};

export default TabSection;