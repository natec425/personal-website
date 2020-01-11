import React from "react";
import { Link, graphql } from "gatsby";
import TemplateWrapper from "../layouts";
import ExperienceEntry from "../components/ExperienceEntry";
import MsuImage from "../../images/msu.png";
import BccaImg from "../../images/bcca.png";
import MeImg from "../../images/me.jpg";
import FncImg from "../../images/fnc.png";
import MyraImg from "../../images/myra.png";
import CollegiateTutoringImg from "../../images/collegiate-tutoring.png";
import "./index.css";

const AboutBaseCamp = () => (
  <div style={{ display: "flex" }}>
    <a className="hide-on-small" href="https://basecampcodingacademy.org/">
      <img
        style={{
          width: 72,
          height: 82,
          marginLeft: 20,
          marginRight: 20
        }}
        src={BccaImg}
        alt="Base Camp Coding Academy"
      />
    </a>
    <div style={{ flex: 1 }}>
      <p>
        I'm Senior Technical Director at{" "}
        <a href="https://basecampcodingacademy.org/">
          Base Camp Coding Academy
        </a>
        . We teach high school graduates near Water Valley, MS how to be
        full-stack software developers in a year. Every student attends with
        full scholarship (with free lunch and gas cards!) thanks to our{" "}
        <a href="https://basecampcodingacademy.org/sponsors">
          wonderful sponsors
        </a>
        . All 11 graduates of our inaugural class graduated with employment
        offers from nearby software development companies, and the future looks
        brighter every day! Local documentary filmmaker,{" "}
        <a href="https://www.joeyork.com/">Joe York</a>, made a great{" "}
        <a href="https://youtu.be/D_Z1dhiPPxE">short film</a> about our first
        year.
      </p>
    </div>
    <img
      className="hide-on-small"
      style={{
        borderRadius: "50%",
        height: 100,
        float: "right"
      }}
      src={MeImg}
      alt="Nate Clark"
    />
  </div>
);

const AtMsu = () => (
  <ExperienceEntry
    title="Mississippi State University"
    logo={{
      href: "http://cse.msstate.edu/",
      alt: "Mississippi State University",
      src: MsuImage
    }}
    asASoftwareDeveloper={
      <>
        In college I caught functional programming fever. It started out as
        googling "functional programming in Python" every few days, but
        eventually I grew into using functional programming languages like{" "}
        <a href="http://www.scala-lang.org/">Scala</a>,{" "}
        <a href="https://racket-lang.org/">Racket</a>, and{" "}
        <a href="https://www.haskell.org/">Haskell</a>.
      </>
    }
    asAnEducator={
      <>
        As an undergrad I noticed that the introductory programming labs were
        understaffed, so I volunteered to help out. Eventually I ended up with a
        teaching assistantship where I tried to contribute my voice to the
        design of the introductory computer science curriculum at MSU.
      </>
    }
  />
);

const AtFnc = () => (
  <ExperienceEntry
    title="FNC"
    logo={{
      href: "http://www.fncinc.com/",
      src: FncImg,
      alt: "FNC"
    }}
    asASoftwareDeveloper={
      <>
        I briefly worked at a financial technology company called FNC. I worked
        on a team that built infrastructure services in{" "}
        <a href="https://en.wikipedia.org/wiki/C_Sharp_%28programming_language%29">
          C#
        </a>{" "}
        with <a href="https://www.asp.net/">ASP.Net</a>. When I could get away
        with it, I would try any to write any tools or tests I needed in{" "}
        <a href="http://fsharp.org/">F#</a>. One of my favorites was a hackathon
        project where I implemented a small domain specific language for a rules
        engine in F#.
      </>
    }
    asAnEducator={
      <>
        Management at FNC was very supportive and allowed me to teach some
        internal courses on functional programming in F#. I also led a small
        book club that starting working through{" "}
        <a href="https://www.amazon.com/Functional-Programming-Scala-Paul-Chiusano/dp/1617290653">
          Functional Programming in Scala
        </a>
        . We didn't finish the book before I left the company, but it was a fun
        group.
      </>
    }
  />
);

const AtMyra = () => (
  <ExperienceEntry
    title="Myra Mirrors"
    logo={{
      src: MyraImg,
      alt: "Myra Mirrors"
    }}
    asASoftwareDeveloper={
      <>
        At Myra Mirrors I was responsible for{" "}
        <a href="https://facebook.github.io/react-native/">React Native</a>{" "}
        development on the company's mobile companion application and{" "}
        <a href="https://www.python.org/">Python</a> development on the smart
        mirror itself. I also helped prepare and demonstrate our product at{" "}
        <a href="https://www.ces.tech">CES</a> this year.
      </>
    }
    asAnEducator={
      <>
        I didn't have any explicit responsibilities or opportunities as an
        educator at Myra, but I tried to bring my experience as a teacher to the
        table when interacting with colleagues. Good coworkers learn from each
        other as they work together; so I tried to be mindful of learning from
        the people around me.
      </>
    }
  />
);

const AtCollegiateTutoring = () => (
  <ExperienceEntry
    title="Collegiate Tutoring"
    logo={{
      href: "https://www.collegiatetutoring.com/",
      alt: "Collegiate Tutoring",
      src: CollegiateTutoringImg
    }}
    asASoftwareDeveloper={
      <>
        At Collegiate Tutoring I built the API to support their two sided
        marketplace between tutors and students using{" "}
        <a href="https://www.django-rest-framework.org/">
          Django REST Framework
        </a>
        . The platform has an emphasis on supporting Greek organizations, so
        there was some fun code involved with splitting expenses between
        students, potentially their organization's budget, and collecting a
        platform fee. Payments were processed using{" "}
        <a href="https://stripe.com/">Stripe</a>. We used{" "}
        <a href="http://www.celeryproject.org/">celery</a> and{" "}
        <a href="https://redis.io/">Redis</a> for background jobs.
      </>
    }
    asAnEducator={
      <>
        I was super excited to work with one of my graduates from Base Camp
        Coding Academy. One of my past graduates was brought on to develop an
        SMS reminder system using <a href="https://www.twilio.com/">Twilio</a>,
        and it was a lot of fun to get to work with them outside of the
        classroom.
      </>
    }
  />
);

const WhatIveBeenSaying = ({ posts }) => (
  <section id="what-ive-been-saying">
    <h2>What I've Been Saying</h2>
    {posts.map(({ node }) => (
      <p key={node.fields.slug}>
        {node.frontmatter.date} -{" "}
        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
      </p>
    ))}
  </section>
);

const WhatIveBeenDoing = () => (
  <section id="what-ive-been-doing">
    <h2>What I've Been Doing</h2>
    <AtCollegiateTutoring />
    <AtMyra />
    <AtFnc />
    <AtMsu />
  </section>
);

const Contact = () => (
  <div>
    <h2>How to get in touch</h2>
    <p>
      If you would like to get in touch, it is probably best to contact me by
      email (<a href="mailto:natec425@gmail.com">natec425@gmail.com</a>). I try
      to respond to emails fairly quickly, and if you're local I'm always happy
      to meet up for a cup of coffee.
    </p>

    <p>
      Other than email: my GitHub is{" "}
      <a href="https://github.com/natec425">natec425</a>, my Codepen is{" "}
      <a href="https://codepen.io/natec425">natec425</a>, and my LinkedIn is...
      you guessed it{" "}
      <a href="https://www.linkedin.com/in/natec425/">natec425</a>.
    </p>
  </div>
);

const IndexPage = ({ data }) => (
  <TemplateWrapper>
    <h1>Hello World!</h1>
    <AboutBaseCamp />
    <WhatIveBeenSaying posts={data.allMarkdownRemark.edges} />
    <WhatIveBeenDoing />
    <Contact />
  </TemplateWrapper>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
