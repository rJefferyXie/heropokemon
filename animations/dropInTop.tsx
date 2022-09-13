const dropInTop = {
  hidden: {
    y: "-15vh",
    transition: {
        duration: 0.2,
        type: "spring"
    }
  },
  visible: {
    y: "0",
  },
  exit: {
    y: "15vh",
    transition: {
        duration: 0.1
    }
  }
}

export default dropInTop;