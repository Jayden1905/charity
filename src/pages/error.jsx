import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { pageTransition } from "../util/animation";

export function ErrorPage({ errorMessage }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-screen flex justify-center items-center"
    >
      <h1 className="text-center text-6xl">{errorMessage}</h1>
    </motion.div>
  );
}

ErrorPage.propTypes = {
  errorMessage: PropTypes.string,
};
