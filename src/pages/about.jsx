import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../util/animation";

export default function About() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto pt-16"
    >
      <h1>About Page</h1>
      <p onClick={() => navigate("/")}>Home</p>
    </motion.div>
  );
}
