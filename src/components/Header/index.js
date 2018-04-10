import React from 'react';
import Link from 'gatsby-link';
import me_img from '../../../images/me.jpg';

const WIDTH = window.innerWidth || document.body.clientWidth;
const IS_SMALL = WIDTH < 750;

const styles = {
    headerContainer: {
        background: '#dddddd',
        marginBottom: '1.45rem',
        paddingLeft: '15%',
        paddingRight: '5%',
        paddingBottom: 5,
        paddingTop: 15
    },
    headerMainSection: {
        margin: '0 auto',
        maxWidth: 960,
        padding: IS_SMALL ? '1.45rem 1.0875rem' : 0
    },
    nameLinkContainer: {
        margin: 0,
        display: 'inline'
    },
    titleContainer: {
        margin: 0,
        paddingLeft: '1.5rem',
        display: IS_SMALL ? 'block' : 'inline'
    }
};

const Header = () => (
    <div style={styles.headerContainer}>
        <div style={styles.headerMainSection}>
            <h1 style={styles.nameLinkContainer}>
                <Link to="/">Nate Clark</Link>
            </h1>
            <h3 style={styles.titleContainer}>Software Developer</h3>
            <h3 style={styles.titleContainer}>Educator</h3>
        </div>
    </div>
);

export default Header;
