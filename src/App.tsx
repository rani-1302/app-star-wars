import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppLayout from './appLayout';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
};

export default App;
