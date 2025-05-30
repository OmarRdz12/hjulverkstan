import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ComponentType, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as DialogManager from '@components/DialogManager';
import ThemeProvider from '@components/shadcn/ThemeProvider';
import Toaster from '@components/shadcn/Toaster';
import * as Tooltip from '@components/shadcn/Tooltip';
import { LocaleProvider, usePreloadedData } from '@hooks/usePreloadedData';
import type { LocaleAllEntitiesMap } from '@data/webedit/types';

import '../globals.css';
import About from './About';
import Home from './Home';
import PageNotFound from './PageNotFound';
import Portal from './Portal';
import ShopDetail from './ShopDetail';
import Shops from './Shops';
import Contact from './Contact';
import Support from './Support';
import Services from './Services';

// React Query Config

/**
 * We configure some retry logic for React Query, queries should always retry
 * three times and all requests should retry if the auth
 * [interceptor middleware](../data/api.ts#errorInteceptor) just successfully
 * refreshed the session on a 401.
 */

const retryDelay = (attemptIndex: number) =>
  Math.min(4000 * attemptIndex, 15000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay,
      retry: (retryCount, error: any) =>
        retryCount < 3 || error?.refreshSuccess,
      refetchIntervalInBackground: true,
    },
    mutations: {
      retryDelay,
      retry: (retryCount, error: any) => error?.refreshSuccess,
    },
  },
});

// Application Routes Config

/**
 * Here we define the routes that make up the react router. We create them as
 * data instead of direct JSX as these routes are used for building our
 * statically generated site. See [link](link)
 */

export const fallBackLocale = 'sv';

export interface RouteAttributes {
  path: string;
  title: string;
  component: ComponentType;
  // Used by the build script to generate files for all segments
  dynamicSegments?: Record<string, string>[];
  disableSSR?: boolean;
}

export const createRoutes = (
  data?: LocaleAllEntitiesMap,
): RouteAttributes[] => {
  const shopSlugs = data?.[fallBackLocale].shops.map((s) => s.slug);

  return [
    {
      path: '/',
      title: 'Hjulverkstan',
      component: Home,
    },
    {
      path: '/about',
      title: 'Hjulverkstan - About',
      component: About,
    },
    {
      path: '/contact',
      title: 'Hjulverkstan - Contact',
      component: Contact,
    },
    {
      path: '/shops',
      title: 'Hjulverkstan - Shops',
      component: Shops,
    },
    {
      path: '/shops/:slug',
      title: 'Hjulverkstan - Shops',
      component: ShopDetail,
      dynamicSegments: shopSlugs?.map((slug) => ({ slug })),
    },
    {
      path: '/support',
      title: 'Hjulverkstan - Support',
      component: Support,
    },
    {
      path: '/services',
      title: 'Hjulverkstan - Services',
      component: Services,
    },
    {
      path: '/portal/*',
      title: 'Hjulverkstan - Portal',
      component: Portal,
      disableSSR: true,
    },
  ];
};

// Render Router with Providers

/**
 * We are using helmet to choose <head> content for our Static Site Generation,
 * but also so that for instance <title> is updated when navigating with
 * react-router. Localised routes have links for SEO.
 */

function RouteHelmet({
  route,
  locale,
}: {
  route: RouteAttributes;
  locale?: string;
}) {
  const { locales } = usePreloadedData();

  return (
    <Helmet>
      <title>{route.title}</title>
      {import.meta.env.VITE_ENV.toLowerCase() !== 'prod' && (
        <meta name="robots" content="noindex, nofollow" />
      )}
      {locale && (
        <>
          <link
            rel="canonical"
            href={`${import.meta.env.VITE_FRONTEND_URL}/${locale ?? fallBackLocale}${route.path}`}
          />
          {locales.map((locale) => (
            <link
              key={locale}
              rel="alternative"
              href={`${import.meta.env.VITE_FRONTEND_URL}/${locale}${route.path}`}
              hrefLang={locale}
            />
          ))}
        </>
      )}
    </Helmet>
  );
}

/**
 * Since redirecting on render is a no-op with react router we want to be able
 * to redirect in a useEffect. This wont actually cause a commited rerender in
 * the way it is used as we redirect to a path with the same content
 */

function RedirectDelayed({ path }: { path: string }) {
  const navigate = useNavigate();

  useEffect(() => navigate(path, { replace: true }), []);
  return null;
}

//

const renderLocalizedRoute = (route: RouteAttributes, locale?: string) => (
  <Route
    key={route.path + locale}
    path={locale ? `/${locale}${route.path}` : route.path}
    element={
      <>
        <RouteHelmet route={route} locale={locale ?? fallBackLocale} />
        <LocaleProvider value={locale ?? fallBackLocale}>
          <route.component />
        </LocaleProvider>
        {!locale && (
          <RedirectDelayed
            path={`/${fallBackLocale}${route.path.replace('/*', '')}`}
          />
        )}
      </>
    }
  />
);

/**
 * Root of the component tree for all components commonly found in server and
 * the client.
 *
 * First we match for CSR (Client Side Rendered) routes and then for all SSR
 * routers, followed by each locale with the SSR routes nested. For more
 * information about our routing see [link](link)
 */

export default function Root() {
  const { locales, data } = usePreloadedData();
  const routes = createRoutes(data);

  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Tooltip.Provider delayDuration={500}>
          <DialogManager.Provider>
            <Routes>
              {routes.map((route) => renderLocalizedRoute(route))}
              {locales
                .map((locale) =>
                  routes.map((route) => renderLocalizedRoute(route, locale)),
                )
                .flat()}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Toaster />
          </DialogManager.Provider>
        </Tooltip.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
