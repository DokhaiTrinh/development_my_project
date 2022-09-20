import React from 'react';
import { Route } from 'react-router-dom';


const LoginLayoutRoute = (props) => {
    const { component: YourComponent, ...remainsprops } = props;
    return (
      <Route
        {...remainsprops}
        render={(routeProps) => {
          return (
            <div>
              <div>
                <YourComponent {...routeProps} />
              </div>
            </div>
          );
        }}
      />
    );
  };
  export default LoginLayoutRoute;
  