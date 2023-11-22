import { Outlet } from "react-router-dom";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorPage } from "./pages/error";
import { Loading } from "./pages/loading";

function App() {
  const [, loading, error] = useAuthState(auth);

  if (loading) return <Loading />;

  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
