import { useNavigate } from "react-router-dom";
import { Container } from "../containers/container.jsx";
import { menuLinks } from "../../util/menu";
import { auth, provider } from "../../config/firebase-config.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  function goHome() {
    navigate("/");
  }

  function goTo(url) {
    navigate(url);
  }

  function login() {
    signInWithPopup(auth, provider);
  }

  function logout() {
    signOut(auth);
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
          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-3 rounded"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={login}
              className="bg-white text-black px-3 rounded"
            >
              Become Member
            </button>
          )}
        </div>
      </Container>
    </div>
  );
}
