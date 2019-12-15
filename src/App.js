import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header } from './components/base';
import routes from './routes';
import CreateDocumentButton from './components/base/create-document-button';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app-root">
          <Header />
          <Switch>
            {routes.map(({ component, exact, path }, index) => (
              <Route
                key={index}
                exact={exact}
                component={component}
                path={path}
              />
            ))}
          </Switch>
          <CreateDocumentButton />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
