const dropIn = {
  hidden: {
    y: "-20vh",
    transition: {
        duration: 0.1,
        type: "spring"
    }
  },
  visible: {
    y: "0",
  },
  exit: {
    y: "20vh",
    transition: {
        duration: 0.1
    }
  }
}

export default dropIn;