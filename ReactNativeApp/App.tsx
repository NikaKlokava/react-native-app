import React from 'react';
import {Game} from './src/components/Game';

function App(): React.JSX.Element {
  return <Game randomNumberCount={6} initialSeconds={10} />;
}

export default App;
