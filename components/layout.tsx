import Link from "next/link";
import React from "react";
import { Fragment, ReactNode } from "react";
import classes from "./layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <NavBar />
      <section className={classes["app"]}>{children}</section>
    </Fragment>
  );
};

const NavBar = () => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  return (
    <header>
      <nav className={classes["navbar"]} onClick={(e) => e.stopPropagation()}>
        <div className={classes["nav-container"]}>
          <Link href="/" className={classes["nav-logo"]}>
            Scenario Dashboard
          </Link>
          <ul
            className={
              click
                ? `${classes["nav-menu"]} ${classes["active"]}`
                : classes["nav-menu"]
            }
          >
            <li className={classes["nav-item"]}>
              <Link
                href="/"
                className={classes["nav-links"]}
                onClick={click ? handleClick : undefined}
              >
                Home
              </Link>
            </li>
            <li className={classes["nav-item"]}>
              <Link
                href="/add-an-scenario"
                className={classes["nav-links"]}
                onClick={click ? handleClick : undefined}
              >
                Add a Scenario
              </Link>
            </li>
          </ul>
          <div className={classes["nav-icon"]} onClick={handleClick}>
            <HamburgerIcon />
          </div>
        </div>
      </nav>
    </header>
  );
};

const HamburgerIcon = () => (
  <svg viewBox="0 0 100 80" width="20" height="20">
    <rect width="100" height="10" color="white" />
    <rect y="30" width="100" height="10" color="white" />
    <rect y="60" width="100" height="10" color="white" />
  </svg>
);

export default Layout;
