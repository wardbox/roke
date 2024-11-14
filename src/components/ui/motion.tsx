export const fadeIn = {
  initial: {
    opacity: 0,
    y: 3,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
}

export const listItemVariant = {
  initial: {
    opacity: 0,
    x: -4,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}
