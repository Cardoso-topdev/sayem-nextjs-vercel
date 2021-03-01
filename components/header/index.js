import styles from "./styles.module.scss";
import Button from "../button";
import ContextMenu from "../contextMenu";
import UserIcon from "../../images/user.svg";
import { useGoogleLogout } from 'react-google-login';
import { parseCookies, destroyCookie} from 'nookies'
import { useContext } from "react";
import { UserDispatchContext, UserStateContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import * as APIService from "../../services/apis";
import * as MyCookies from "../../services/manage_cookie";

const Header = ({isLoginPage, isContextMenuOpen, toggleContextMenu, handleNavigation, closeContextMenu}) => {
  const clientId = '604163155271-s7fbkk86o6lscguutpl8k7632fk6c1uq.apps.googleusercontent.com';
  const dispatch = useContext(UserDispatchContext);
  // const {token, userName} = useContext(UserStateContext);
  const {token, userName, userId} = parseCookies()
  console.log("Header: ", userName);
  const router = useRouter();

  const onFailure = () => {
    console.log('Handle failure cases');
    router.push("/login");
  };
 
  const onLogoutSuccess = (res) => {
    router.push("/login");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const logout = async () => {
    try{
      await APIService.Logout(token);

      MyCookies.ClearCookies(userId);

      // dispatch({ type: "LOGOUT"});
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(
          auth2.disconnect().then(onLogoutSuccess)
        )
      }

      // signOut();
    } catch ( err) {
      console.log("LOGOUT ERROR", err)
    }
  }
  return (
    <header className={styles.headerBar}>
      <div className={styles.logo}>
        <a href="/users" role="link" tabIndex="0">
          Read<span style={{ fontSize: "1.25rem" }}>with</span>me
        </a>
      </div>
      <nav className={styles.nav}>
        {!isLoginPage && (!token)  && <Button href="/login">Login</Button>}
        {!isLoginPage && token  && 
          <div className={styles.user}>
            <p>{userName}</p>
            <span
              role="button"
              tabIndex="0"
              onClick={toggleContextMenu}
            >
              <img src={UserIcon} alt="User Icon" />
            </span>
          </div>
        }
        {!isLoginPage && token && isContextMenuOpen && (
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
                id: "signout",
                label: "Logout",
                action: logout,
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