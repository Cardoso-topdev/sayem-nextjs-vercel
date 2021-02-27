import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { UserStateContext } from "../../context/UserContext";

import styles from "./styles.module.scss";
import GithubIcon from "../../images/github.svg";
import Header from "../header";

const Layout = ({ children }) => {
  const router = useRouter();
  const state = useContext(UserStateContext);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const isLoginPage = router.pathname === "/login";
  const isAuth = state.isAuth;
  const userId = state.userId;
  const userName = state.userName;

  const toggleContextMenu = () => {
    setIsContextMenuOpen(!isContextMenuOpen);
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const handleNavigation = (path) => {
    closeContextMenu();
    router.push(path);
  };

  return (
    <div id="layoutRoot">
      <Head>
        <title>Read with me</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Header 
          isLoginPage={isLoginPage}
          isAuth={isAuth}
          userId={userId}
          userName={userName}
          isContextMenuOpen={isContextMenuOpen}
          toggleContextMenu={toggleContextMenu} 
          handleNavigation={handleNavigation} 
          closeContextMenu={closeContextMenu}/>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footerBar}>
        <hr className={styles.hr} />
        <div className={styles.github}>
          <a
            href="https://github.com/sayemmh"
            rel="noopener noreferrer"
            role="link"
            tabIndex="0"
          >
            <img src={GithubIcon} alt="Github Icon" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
