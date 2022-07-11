// Next and Styling
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

// Redux
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper, store, persistor } from '../store/store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps}/>
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);