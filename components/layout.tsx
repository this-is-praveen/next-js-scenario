import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Fragment, ReactNode } from "react";
import { PaperBackground } from "../common/functions";
import classes from "./layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <main className={classes["app"]}>
        <PaperBackground />
        <NavBar />
        <section className="main_section">{children}</section>
      </main>
    </Fragment>
  );
};

const NavBar = () => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => {
    setClick(!click);
    const mainElement = document.body.querySelector(
      "section[class^='main_section']"
    );
    if (!mainElement) return;
    const layoutClasses = mainElement.classList;
    if (!click) {
      layoutClasses.add("blurBy4px");
    } else {
      layoutClasses.remove("blurBy4px");
    }
  };
  const Close = () => setClick(false);
  const { pathname } = useRouter();
  const hyperLinks = {
    home: "/",
    addAnScenario: "/add-an-scenario",
  };
  const linkClassName = (path: string) => {
    const isActive = path === pathname;
    return `${classes["nav-links"]}${isActive ? ` ${classes["mark"]}` : ""}`;
  };

  return (
    <header>
      <nav className={classes["navbar"]} onClick={(e) => e.stopPropagation()}>
        <div className={classes["nav-container"]}>
          {click ? (
            <div className={classes["nav-logo"]}>Scenario Dashboard</div>
          ) : (
            <Link href={"/"} className={classes["nav-logo"]}>
              Scenario Dashboard
            </Link>
          )}
          <ul
            className={
              click
                ? `${classes["nav-menu"]} ${classes["active"]}`
                : classes["nav-menu"]
            }
          >
            <li className={classes["nav-item"]}>
              <Link
                href={hyperLinks.home}
                className={linkClassName(hyperLinks.home)}
                onClick={click ? handleClick : undefined}
              >
                Home
              </Link>
            </li>
            <li className={classes["nav-item"]}>
              <Link
                href={hyperLinks.addAnScenario}
                className={linkClassName(hyperLinks.addAnScenario)}
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
  <svg viewBox="0 0 100 80" width="20" height="20" fill="#fff">
    <rect width="100" height="10" color="white" />
    <rect y="30" width="100" height="10" color="white" />
    <rect y="60" width="100" height="10" color="white" />
  </svg>
);

export default Layout;
