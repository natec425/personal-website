import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';
import './index.css';

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet title="Nate Clark">
            <html lang="en" />
            <meta name="Description" content="Nate Clark's home page. Nate is a Software Developer and Educator in Water Valley, MS." />
        </Helmet>
        <Header />
        <div
            style={{
                margin: '0 auto',
                maxWidth: 1028,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0
            }}
        >
            {children()}
        </div>
    </div >
);

TemplateWrapper.propTypes = {
    children: PropTypes.func
};

export default TemplateWrapper;
