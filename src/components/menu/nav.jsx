import { useNavigate } from "react-router-dom";
import { Container } from "../containers/container.jsx";
import { menuLinks } from "../../util/menu";

export default function Nav() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  function goTo(url) {
    navigate(url);
  }

  return (
    <div className="fixed w-full py-2 backdrop-blur z-50">
      <Container className="flex justify-between items-center">
        <div
          onClick={goHome}
          className="w-10 h-10 cursor-pointer flex justify-items-center items-center"
        >
          <img src="/dogpaws.png" alt="logo" />
        </div>
        <ul className="flex gap-8">
          {menuLinks.map((link, index) => (
            <li
              onClick={() => goTo(link.path)}
              key={index}
              className="cursor-pointer"
            >
              {link.name}
            </li>
          ))}
        </ul>
        <div>
          <button>Become Member</button>
        </div>
      </Container>
    </div>
  );
}
