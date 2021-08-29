import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from './routes';
import HomeScreen from '../screens/HomeScreen';
import AssetsScreen from '../screens/AssetsScreen';
import TradesScreen from '../screens/TradesScreen';

export const Router: FC = () => (
  <Switch>
    <Route path={routes.HOME} exact component={HomeScreen} />
    <Route path={routes.ASSETS} exact component={AssetsScreen} />
    <Route path={routes.TRADES} exact component={TradesScreen} />
  </Switch>
);
