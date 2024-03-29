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
  const { pathname } = useRouter();
  const hyperLinks = {
    home: "/",
    addAnScenario: "/addAnScenario",
  };
  const linkClassName = (path: string) => {
    const isActive = path === pathname;
    return `${classes["nav-links"]}${isActive ? ` ${classes["mark"]}` : ""}`;
  };
  const Title = "Scenic";

  return (
    <header>
      <nav className={classes["navbar"]} onClick={(e) => e.stopPropagation()}>
        <div className={classes["nav-container"]}>
          <Link href={"/"} className={classes["nav-logo"]}>
            {Title}
          </Link>
          <ul className={classes["nav-menu"]}>
            <li className={classes["nav-item"]}>
              <Link
                href={hyperLinks.home}
                className={linkClassName(hyperLinks.home)}
              >
                Home
              </Link>
            </li>
            <li className={classes["nav-item"]}>
              <Link
                href={hyperLinks.addAnScenario}
                className={linkClassName(hyperLinks.addAnScenario)}
              >
                Add a Scenario
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Layout;
