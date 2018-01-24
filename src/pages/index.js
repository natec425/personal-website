import React from 'react';
import Link from 'gatsby-link';

const IndexPage = () => (
    <div>
        <h1>Hello World!</h1>
        <div style={{ display: 'flex' }}>
            <div>
                <img
                    style={{
                        width: 72,
                        height: 82,
                        marginLeft: 20,
                        marginRight: 20
                    }}
                    src="/static/images/bcca.png"
                />
            </div>
            <div style={{ flex: 1 }}>
                <p>
                    I'm Technical Director at{' '}
                    <a href="https://basecampcodingacademy.org/">
                        Base Camp Coding Academy
                    </a>. We teach high school graduates near Water Valley, MS
                    how to be full-stack software developers in a year. Every
                    student attends with full scholarship (with free lunch and
                    gas cards!) thanks to our{' '}
                    <a href="https://basecampcodingacademy.org/sponsors">
                        wonderful sponsors
                    </a>. All 11 graduates of our inaugural class graduated with
                    employment offers from nearby software development
                    companies, and the future looks brighter every day! Local
                    documentary filmmaker,{' '}
                    <a href="https://www.joeyork.com/">Joe York</a>, made a
                    great <a href="https://youtu.be/D_Z1dhiPPxE">short film</a>{' '}
                    about our first year.
                </p>
            </div>
        </div>
    </div>
);

export default IndexPage;
