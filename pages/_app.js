import App from "next/app";
import cookies from "next-cookies";
import UserProvider from "../context/UserContext";
import Layout from "../components/layout";
import 'bootstrap/dist/css/bootstrap.css'
import "typeface-nunito-sans";
import "typeface-roboto";
import "../shared/global.scss";

const MyApp = ({ Component, pageProps, isAuthenticated, token, userId, userName  }) => {
  return (
    <UserProvider isAuthenticated={isAuthenticated} token={token} userId={userId} userName={userName}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

MyApp.getInitialProps = async (context) => {
  let isAuthenticated = false;

  // WARNING - We only check if a cookie called token is present
  // We do not verify the token on the server at this point
  // In this case, it might be fine since we only need the auth state
  // for UI purposes. Any sensitive data fetch is secured separately
  const allCookies = cookies(context.ctx);
  const { token, userId, userName } = allCookies;
  if (token) {
    isAuthenticated = true;
    console.log("COOKIE: ", allCookies);
  }
  const appProps = await App.getInitialProps(context);
  return { ...appProps, isAuthenticated, token, userId, userName };
};

export default MyApp;
