import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

const renderRoutes = (items) =>
  items.map(({ path, index, element, children }, i) => (
    <Route
      key={path ?? `index-${i}`}
      {...(index ? { index: true } : { path })}
      element={element}
    >
      {children && renderRoutes(children)}
    </Route>
  ));

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <BrowserRouter>
            <Routes>{renderRoutes(routes)}</Routes>
          </BrowserRouter>
        </AccessibilityProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
