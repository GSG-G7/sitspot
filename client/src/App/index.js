import React from 'react';

import { Layout } from '../components';
import { AddNewSitSpot } from '../pages';

import './style.css';

const App = () => (
  <div className="App">
    <Layout>
      <AddNewSitSpot />
    </Layout>
  </div>
);

export default App;
