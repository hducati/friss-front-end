import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { FormulaProvider } from 'hooks/use-formula/use-formula';
import { CreateFormulaScreen } from 'screens/create-formula/create-formula-screen';
import { HomeScreen } from 'screens/home/home';

function App() {
  return (
    <FormulaProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomeScreen}/>
          <Route path="/formula" exact component={CreateFormulaScreen} />
        </Switch>
      </BrowserRouter>
    </FormulaProvider>
  );
}

export default App;
