import { Outlet } from "react-router-dom";
import Nav from "./components/menu/nav";
import { Container } from "./components/containers/container";
import { auth } from "./config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { ErrorPage } from "./pages/error";

function App() {
  const [, loading, error] = useAuthState(auth);

  if (loading) return <></>;

  if (error) return <ErrorPage errorMessage={error.message} />;

  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
