// Basic Transitions
export const fadeIn = {
  initial: { 
    opacity: 0,
  },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" }
  }
}

export const slideInUp = {
  initial: { 
    y: 20, 
    opacity: 0,
  },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  exit: { 
    y: 20, 
    opacity: 0,
  }
}

// Theme Toggle Animation
export const darkMode = {
  initial: { 
    opacity: 0, 
    rotate: 45
  },
  animate: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 8,
      mass: 0.8
    }
  },
  exit: { 
    opacity: 0, 
    rotate: 45,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 8,
      mass: 0.8
    }
  }
}

export const lightMode = {
  initial: { 
    opacity: 0, 
    rotate: 0,
  },
  animate: { 
    opacity: 1, 
    rotate: 45,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 8,
      mass: 0.8
    }
  },
  exit: { 
    opacity: 0, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 8,
      mass: 0.8
    }
  }
}

// Hover Effects
export const hoverScale = {
  whileHover: { 
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  whileTap: { 
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 15
    }
  }
}

export const hoverTilt = {
  whileHover: { 
    rotate: 5,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

// Loading Spinner
export const spinner = {
  animate: { 
    rotate: 360,
    transition: {
      repeat: Infinity,
      type: "spring",
      damping: 25,
      stiffness: 120
    },
  },
}

// Page Transitions
export const pageTransition = {
  initial: { 
    opacity: 0, 
    y: 20,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
}

// Stagger Children
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  hidden: { 
    y: 20, 
    opacity: 0,
  },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.8
    }
  }
}

// Text Animation - Typing Effect
export const textContainer = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
}

export const textChild = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  }
}

// Cursor Animation
export const cursorBlink = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: [0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.5, 1]
    }
  }
}

// Scroll To Top
export const scrollToTop = {
  initial: { 
    opacity: 0,
    y: 100,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.1,
      stiffness: 300,
      damping: 8,
      mass: 0.2
    }
  },
  exit: { 
    opacity: 0,
    y: 10,
    transition: {
      type: "tween",
      duration: 0.2
    }
  }
}

// Typing Animation Variants
export const typingCursor = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1]
    }
  }
};

export const typingText = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};
