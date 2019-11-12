import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from '../components';
import {
  AboutUs,
  AddReview,
  FAQ,
  Home,
  SearchPage,
  AddNewSitSpot,
  SinglePlace,
} from '../pages';

import './style.css';

const App = () => (
  <div className="App">
    <Layout>
      <Switch>
        <Route
          path="/"
          exact
          render={({ history }) => <Home history={history} />}
        />
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/faq" component={() => <FAQ />} />
        <Route path="/about-us" component={() => <AboutUs />} />
        <Route
          path="/search"
          component={({ location: { state = {} } }) => (
            <SearchPage searchState={state} />
          )}
        />
        <Route
          path="/add-review/:type/:sitspotId"
          render={({
            history,
            match: {
              params: { type, sitspotId },
            },
          }) => (
            <AddReview history={history} type={type} sitspotId={sitspotId} />
          )}
        />
        <Route path="/add-place">
          <AddNewSitSpot />
        </Route>
        <Route
          path="/sitspot/:id"
          render={({
            match: {
              params: { id },
            },
          }) => <SinglePlace sitspotId={id} />}
        />
      </Switch>
    </Layout>
  </div>
);

export default App;
