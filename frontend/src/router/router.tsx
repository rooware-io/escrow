import React, { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export const Router: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <HomeScreen />
      </Route>
    </Switch>
  </BrowserRouter>
);
