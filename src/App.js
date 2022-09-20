import './App.css';
import './themes/main.scss';
import { history } from './common/history';
import { Router, Switch } from 'react-router-dom';
import { HOME_ROUTES, LOGIN_ROUTES } from './contants/Index';
import HomeLayoutRoute from './common/Layouts/HomeLayout/HomeLayout';
import LoginLayoutRoute from './common/Layouts/LoginLayout/LoginLayout';
import React from 'react';
import { useEffect } from 'react';

const renderHomePageRoutes = () => {
  let xhtml = null;
  xhtml = HOME_ROUTES.map((route) => {
    return (
        <HomeLayoutRoute
          key={route.path}
          path={route.path}
          name={route.name}
          exact={route.exact}
          component={route.component}
        />
    );
  });
  return xhtml;
};
const renderLoginPageRoutes = () => {
  let xhtml = null;
  xhtml = LOGIN_ROUTES.map((route) => {
    return (
      <LoginLayoutRoute
        key={route.path}
        path={route.path}
        name={route.name}
        exact={route.exact}
        component={route.component}
      />
    );
  });
  return xhtml;
};

const App = (props) => {
  useEffect(() => {
    // change background color with a random color
    const color = '#FAFBFC';
    document.body.style.background = color;
  });
  return (
    <Router history={history}>
      <Switch>
        {renderHomePageRoutes()}
        {renderLoginPageRoutes()}
      </Switch>
    </Router>
  );
};

export default App;
