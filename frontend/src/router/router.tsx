import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from './routes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CreateTradeScreen from '../screens/CreateTradeScreen/CreateTradeScreen';

export const Router: FC = () => (
  <Switch>
    <Route path={routes.HOME} exact component={HomeScreen} />
    <Route path={routes.CREATE_TRADE} exact component={CreateTradeScreen} />
  </Switch>
);
