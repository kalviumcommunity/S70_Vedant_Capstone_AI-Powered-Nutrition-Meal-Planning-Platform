import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MealPlanner = lazy(() => import('./pages/MealPlanner'));
const Profile = lazy(() => import('./pages/Profile'));
const Recipe = lazy(() => import('./pages/Recipe'));
const Recipes = lazy(() => import('./pages/Recipes'));
const Delivery = lazy(() => import('./pages/Delivery'));
const Orders = lazy(() => import('./pages/Orders'));
const Shop = lazy(() => import('./pages/Shop'));
const SignIn = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

// Protected Route component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
}

function AppRoutes() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/signin" element={
          <PageTransition>
            <SignIn />
          </PageTransition>
        } />
        <Route path="/signup" element={
          <PageTransition>
            <Signup />
          </PageTransition>
        } />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <PageTransition>
              <Dashboard />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/meal-planner" element={
          <PageTransition>
            <MealPlanner />
          </PageTransition>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <PageTransition>
              <Profile />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/recipes" element={
          <PageTransition>
            <Recipes />
          </PageTransition>
        } />
        <Route path="/recipe/:recipeId" element={
          <PageTransition>
            <Recipe />
          </PageTransition>
        } />
        <Route path="/delivery/:orderId" element={
          <ProtectedRoute>
            <PageTransition>
              <Delivery />
            </PageTransition>
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <PageTransition>
            <Orders />
          </PageTransition>
        } />
        <Route path="/shop" element={
          <PageTransition>
            <Shop />
          </PageTransition>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={
          <PageTransition>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
              <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
            </div>
          </PageTransition>
        } />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-8 mt-16">
                  <AppRoutes />
                </main>
                <ScrollToTop />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;