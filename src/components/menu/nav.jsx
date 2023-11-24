import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container } from "../containers/container.jsx";
import { menuLinks } from "../../util/menu";
import { auth, provider } from "../../config/firebase-config.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "./avatar.jsx";
import { navAnimation } from "../../util/animation.js";

export default function Nav() {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

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
    !loading && (
      <motion.div
        variants={navAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed w-full py-2 bg-dark z-40"
      >
        <Container className="flex justify-between items-center">
          <div
            onClick={goHome}
            className="w-10 h-10 cursor-pointer flex justify-items-center items-center"
          >
            <img src="/dogpaws.png" alt="logo" />
          </div>
          <ul className="hidden sm:flex gap-8">
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

          <div className="flex">
            {user ? (
              <div className="dropdown dropdown-hover dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost hover:bg-transparent mt-1 p-0"
                >
                  <Avatar />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-md bg-base-200 rounded-box w-52"
                >
                  <li onClick={() => goTo("/release")}>
                    <a>Release Pet</a>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <button onClick={login} className="btn btn-sm btn-accent">
                Become Member
              </button>
            )}
            <div className="block sm:hidden dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost hover:bg-transparent m-1"
              >
                <button className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-md bg-base-200 rounded-box w-52"
              >
                {menuLinks.map((link, index) => (
                  <li
                    onClick={() => goTo(link.path)}
                    key={index}
                    className="cursor-pointer"
                  >
                    <a>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </motion.div>
    )
  );
}
