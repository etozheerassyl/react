import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { LoadingFallback } from "./components/LoadingFallback";
import { AuthProvider } from "./hooks/useAuth";

// Lazy loading 3+ pages using React.lazy and Suspense for optimal bundle splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ItemsPage = lazy(() => import("./pages/ItemsPage"));
const ItemDetailPage = lazy(() => import("./pages/ItemDetailPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback message="Initializing Aegis Subsystem Route..." />}>
          <Routes>
            {/* Nested Route Architecture via RootLayout & Outlet */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="items" element={<ItemsPage />} />
              <Route path="items/:id" element={<ItemDetailPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="login" element={<LoginPage />} />
              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

