export const pageTransition = {
  initial: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },

  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },

  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const navAnimation = {
  initial: {
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
