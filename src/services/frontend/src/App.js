import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavItem, NavDropdown } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/");
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const authConfig = Auth.configure();
      const { domain, redirectSignIn, responseType } = authConfig.oauth;
      const clientId = authConfig.userPoolWebClientId;
      const url = `https://${domain}/oauth2/authorize?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
      window.location.assign(url);
    } catch (e) {
      onError(e);
    }
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar collapseOnSelect className="App navbar">
          <Navbar.Brand>
            <Link to="/">APS Home</Link>
          </Navbar.Brand>
          <Navbar.Collapse>
            {isAuthenticated ? (
              <>
                <Navbar.Brand className="navbar-right">
                  <NavDropdown id="User" title="My Account">
                    <Link to="/profile">
                      <NavItem className="navitem" href="/profile">
                        User Profile
                      </NavItem>
                    </Link>
                    <NavItem className="navitem" onClick={handleLogout}>
                      Logout
                    </NavItem>
                  </NavDropdown>
                </Navbar.Brand>
              </>
            ) : (
              <>
                <Navbar.Brand
                  className="navbar-right"
                  href="/"
                  onClick={handleLogin}
                >
                  Login
                </Navbar.Brand>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
