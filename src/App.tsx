import React from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Board from './components/Board';
import 'typeface-roboto';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2196f3'
      }
    }
  });

  return (
    <MuiThemeProvider theme={ theme } >
      <Board />
    </MuiThemeProvider>
  );
}

export default App;
