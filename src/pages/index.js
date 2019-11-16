import React from "react";
import TemplateWrapper from "../layouts";
import ExperienceEntry from "../components/ExperienceEntry";
import msu_img from "../../images/msu.png";
import bcca_img from "../../images/bcca.png";
import me_img from "../../images/me.jpg";
import fnc_img from "../../images/fnc.png";
import myra_img from "../../images/myra.png";
import collegiatetutoring_img from "../../images/collegiate-tutoring.png";
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
        src={bcca_img}
        alt="Base Camp Coding Academy Logo"
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
      src={me_img}
      alt="Picture of Nate Clark"
    />
  </div>
);

const AtMsu = () => (
  <ExperienceEntry
    logo={{
      href: "http://cse.msstate.edu/",
      alt: "Mississippi State University",
      src: msu_img
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
    logo={{
      href: "http://www.fncinc.com/",
      src: fnc_img,
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
    logo={{
      href: "http://myramirrors.com/",
      src: myra_img,
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
    logo={{
      href: "https://www.collegiatetutoring.com/",
      alt: "Collegiate Tutoring",
      src: collegiatetutoring_img
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

const WhatIveBeenDoingHeaders = () => (
  <tr>
    <td className="hide-on-small" />
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
      <tbody>
        <WhatIveBeenDoingHeaders />
        <AtCollegiateTutoring />
        <AtMyra />
        <AtFnc />
        <AtMsu />
      </tbody>
    </table>
  </div>
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
      Other than email, my github account is{" "}
      <a href="https://github.com/natec425">natec425</a> if you want to look
      around.
    </p>
  </div>
);

const IndexPage = () => (
  <TemplateWrapper>
    <h1>Hello World!</h1>
    <AboutBaseCamp />
    <WhatIveBeenDoing />
    <Contact />
  </TemplateWrapper>
);

export default IndexPage;
