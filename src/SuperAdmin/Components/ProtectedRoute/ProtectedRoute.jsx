const ProtectedRoute = () => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to='/admin' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
