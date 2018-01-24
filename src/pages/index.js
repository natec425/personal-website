import React from 'react';
import Link from 'gatsby-link';
import msu_img from '../../public/static/images/msu.png';
import bcca_img from '../../public/static/images/bcca.png';
import me_img from '../../public/static/images/me.jpg';

const AboutBaseCamp = () => (
    <div style={{ display: 'flex' }}>
        <div>
            <img
                style={{
                    width: 72,
                    height: 82,
                    marginLeft: 20,
                    marginRight: 20
                }}
                src={bcca_img}
            />
        </div>
        <div style={{ flex: 1 }}>
            <p>
                I'm Technical Director at{' '}
                <a href="https://basecampcodingacademy.org/">
                    Base Camp Coding Academy
                </a>. We teach high school graduates near Water Valley, MS how
                to be full-stack software developers in a year. Every student
                attends with full scholarship (with free lunch and gas cards!)
                thanks to our{' '}
                <a href="https://basecampcodingacademy.org/sponsors">
                    wonderful sponsors
                </a>. All 11 graduates of our inaugural class graduated with
                employment offers from nearby software development companies,
                and the future looks brighter every day! Local documentary
                filmmaker, <a href="https://www.joeyork.com/">Joe York</a>, made
                a great <a href="https://youtu.be/D_Z1dhiPPxE">short film</a>{' '}
                about our first year.
            </p>
        </div>
        <img
            style={{
                borderRadius: '50%',
                height: 100,
                float: 'right'
            }}
            src={me_img}
        />
    </div>
);

const Td = props => (
    <td
        style={{
            verticalAlign: 'top',
            paddingTop: 30,
            paddingRight: 50,
            paddingBottom: 50
        }}
        {...props}
    >
        {props.children}
    </td>
);

const AtMsu = () => (
    <tr>
        <td>
            <img style={{ minWidth: 100 }} src={msu_img} />
        </td>
        <Td>
            In college I caught functional programming fever. It started out as
            googling "functional programming in Python" every few days, but
            eventually I grew into using proper functional programming languages
            like Scala, Racket, and Haskell.
        </Td>
        <Td>
            As an undergrad I noticed that the introductory programming labs
            were understaffed, so I volunteered to help out. Eventually I ended
            up with a teaching assistantship where I tried to contribute my
            voice to the design of the introductory curriculum at MSU.
        </Td>
    </tr>
);

const WhatIveBeenDoingHeaders = () => (
    <tr>
        <td />
        <td>
            <h3>As a Software Developer...</h3>
        </td>
        <td>
            <h3>As an Educator...</h3>
        </td>
    </tr>
);

const WhatIveBeenDoing = () => (
    <div>
        <h2>What I've been doing</h2>
        <table>
            <WhatIveBeenDoingHeaders />
            <AtMsu />
        </table>
    </div>
);

const IndexPage = () => (
    <div>
        <h1>Hello World!</h1>
        <AboutBaseCamp />
        <WhatIveBeenDoing />
    </div>
);

export default IndexPage;
