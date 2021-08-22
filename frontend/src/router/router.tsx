import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../screens/Home/Home';

export const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);
