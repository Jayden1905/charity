import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const navigate = useNavigate();

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
      <h1>About Page</h1>
      <p onClick={() => navigate("/")}>Home</p>
    </motion.div>
  );
}
