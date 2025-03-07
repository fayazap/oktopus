import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import '../utils/map.css';
import { useEffect, useState } from 'react';
import { BackendProvider } from 'src/contexts/backend-context';
import { AlertProvider } from 'src/contexts/error-context';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const [theme, setTheme] = useState(null);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    setTheme(createTheme());
  }, []);

  return theme && (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Oktopus | Controller
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          {/* <WsProvider> */}
          <AlertProvider>
            <BackendProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <AuthConsumer>
                    {
                      (auth) => auth.isLoading
                        ? <SplashScreen />
                        : getLayout(<Component {...pageProps} />)
                    }
                  </AuthConsumer>
                </ThemeProvider>
            </BackendProvider>
          </AlertProvider>
          {/* </WsProvider> */}
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
