// Next and Styling
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper, store, persistor } from '../store/store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.Cypress) {
    // @ts-ignore
    window.store = store; 
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps}/>
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);