import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider as CollaborationProvider } from 'sundae-collab-react';
import 'sundae-collab-react/style.css';

import Loading from './components/Loading';
import Navbar from './components/Navbar';
import generateName from './utils/generateName';

const RecipesPage = lazy(() => import('./pages/Recipes'));
const RecipesAddPage = lazy(() => import('./pages/RecipesAdd'));
const RecipesEditPage = lazy(() => import('./pages/RecipesEdit'));

const TestTypingLag = lazy(() => import('./pages/TestTypingLag'));
const TestMultipleClients = lazy(() => import('./pages/TestMultipleClients'));
const TestStringsEqual = lazy(() => import('./pages/TestStringsEqual'));

// demo-client generates a random identity per session
const name = sessionStorage.getItem('name') || generateName();
sessionStorage.setItem('name', name);

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/test/multiple-clients/:number" component={TestMultipleClients} />
          <Route exact path="/test/typing-lag" component={TestTypingLag} />
          <Route exact path="/test/strings-equal" component={TestStringsEqual} />
          <Route path="/">
            {() => (
              // identity should come from your auth provider
              <CollaborationProvider url={process.env.REACT_APP_COLLAB_URL} identity={{ name }}>
                <Navbar name={name} />

                <Switch>
                  <Route exact path="/" render={() => <Redirect to="/recipes" />} />
                  <Route exact path="/recipes" component={RecipesPage} />
                  <Route exact path="/recipes/add" component={RecipesAddPage} />
                  <Route exact path="/recipes/:id" component={RecipesEditPage} />
                </Switch>
              </CollaborationProvider>
            )}
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  </div>
);

export default App;
