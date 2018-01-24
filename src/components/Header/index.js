import React from 'react';
import Link from 'gatsby-link';
import me_img from '../../../public/static/images/me.jpg';

const Header = () => (
    <div
        style={{
            background: '#dddddd',
            marginBottom: '1.45rem',
            paddingLeft: '15%',
            paddingRight: '5%',
            paddingBottom: 5,
            paddingTop: 15
        }}
    >
        <div
            style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '1.45rem 1.0875rem',
                display: 'inline'
            }}
        >
            <h1
                style={{
                    margin: 0,
                    display: 'inline'
                }}
            >
                <Link to="/">Nate Clark</Link>
            </h1>
            <h3 style={{ margin: 0, paddingLeft: '1.5rem', display: 'inline' }}>
                Software Developer
            </h3>
            <h3 style={{ margin: 0, paddingLeft: '1.5rem', display: 'inline' }}>
                Educator
            </h3>
        </div>
    </div>
);

export default Header;
