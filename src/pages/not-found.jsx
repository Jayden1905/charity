import { motion } from "framer-motion";
import { pageTransition } from "../util/animation";

export default function NotFound() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-screen flex justify-center items-center"
    >
      <h1 className="text-center text-6xl">404 Not Found</h1>
    </motion.div>
  );
}
