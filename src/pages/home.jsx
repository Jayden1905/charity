import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="max-w-7xl mx-auto pt-16"
    >
      <h1 className="text-2xl">Home Page - {user && user.displayName} </h1>
      <p onClick={() => navigate("/about")}>About Page</p>
    </motion.div>
  );
}
