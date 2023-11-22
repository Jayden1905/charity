import { Outlet } from "react-router-dom";
import Nav from "./components/menu/nav";
import { Container } from "./components/containers/container";

function App() {
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
