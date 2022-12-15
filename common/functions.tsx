import { Fragment } from "react";
import classes from "./common.module.css";

const PaperBackground = () => {
  return (
    <Fragment>
      <div className="parchment">
        <a
          className={classes["signature"]}
          href={"https://this-is-praveen.github.io/praveen_pf/"}
          target="_blank"
          rel="noreferrer"
        >
          - Praveen G
        </a>
      </div>
      <svg className="d_none">
        <filter id="wavy2">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.02"
            numOctaves="5"
            seed="1"
          />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
    </Fragment>
  );
};

const Loader = () => {
  return (
    <div className={classes["loader"]}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  );
};

export { Loader, PaperBackground };
