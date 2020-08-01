import React from 'react';
import MealList from '../src/conteiners/MealList/MealList';
import { Route, Switch } from 'react-router-dom';
import MealCreator from '../src/conteiners/MealCreator/MealCreator';
import Auth from '../src/conteiners/Auth/Auth';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MealList} />
        <Route path="/auth" component={Auth} />
        <Route path="/create" component={MealCreator} />
      </Switch>
    </div>
  );
}

export default App;
