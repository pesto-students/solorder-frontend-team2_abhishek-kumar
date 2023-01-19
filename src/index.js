import React from 'react';
import ReactDOM from 'react-dom/client';
import config from './common/config';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PageRoutes from './pages';
import { StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// import { BrowserRouter } from 'react-router-dom';
const cache = createCache({
  key: 'css',
  prepend: true,
});

// Sentry Configuration
Sentry.init({
  dsn: config.SENTRY_DNS,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StyledEngineProvider injectFirst> */}
    <CacheProvider value={cache}>
      <PageRoutes />
      </CacheProvider>
    {/* </StyledEngineProvider> */}
  </React.StrictMode>
);

