import styles from "./styles.module.scss";
import Button from "../button";
import ContextMenu from "../contextMenu";
import UserIcon from "../../images/user.svg";

const Header = ({isLoginPage, isAuth, userId, userName, isContextMenuOpen, toggleContextMenu, handleNavigation, closeContextMenu}) => {
  return (
    <header className={styles.headerBar}>
      <div className={styles.logo}>
        <a href="/users" role="link" tabIndex="0">
          Read<span style={{ fontSize: "1.25rem" }}>with</span>me
        </a>
      </div>
      <nav className={styles.nav}>
        {!isLoginPage && !isAuth  && <Button href="/login">Login</Button>}
        {!isLoginPage && isAuth  && (
          <div className={styles.user}>
            <p>{userName}</p>
            <span
              role="button"
              tabIndex="0"
              onClick={() => toggleContextMenu()}
            >
              <img src={UserIcon} alt="User Icon" />
            </span>
          </div>
        )}
        {!isLoginPage && isAuth && isContextMenuOpen && (
          <ContextMenu
            menuItems={[
              {
                id: "pages",
                label: "Profile",
                action: () => handleNavigation("/pages"),
              },
              {
                id: "account",
                label: "Account Settings",
                action: () => handleNavigation("/account"),
              },
              {
                id: "logout",
                label: "Logout",
                action: () => handleNavigation("/logout"),
              },
            ]}
            closeAction={() => closeContextMenu()}
            isTopNavigation={true}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;



   