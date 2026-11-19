import { Component, lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { RootLayout } from "./components/RootLayout";
import { LoadingFallback } from "./components/LoadingFallback";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { PwaProvider } from "./pwa/PwaContext";
import { queryClient } from "./services/queryClient";
import OfflinePage from "./pages/OfflinePage";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ItemsPage = lazy(() => import("./pages/ItemsPage"));
const ItemDetailPage = lazy(() => import("./pages/ItemDetailPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <OfflinePage />;
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PwaProvider>
        <HashRouter>
          <AuthProvider>
            <RouteErrorBoundary>
              <Suspense fallback={<LoadingFallback message="Initializing Aegis Subsystem Route..." />}>
                <Routes>
                  <Route path="/" element={<RootLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="items" element={<ItemsPage />} />
                    <Route path="items/:id" element={<ItemDetailPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="offline" element={<OfflinePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignUpPage />} />

                    {/* Protected Authenticated Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="profile" element={<ProfilePage />} />
                    </Route>

                    {/* Catch-all 404 Route */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Suspense>
            </RouteErrorBoundary>
          </AuthProvider>
        </HashRouter>
      </PwaProvider>
    </QueryClientProvider>
  );
}

export default App;
