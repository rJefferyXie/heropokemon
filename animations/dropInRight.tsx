const dropInRight = {
  hidden: {
    x: "15vw",
    transition: {
        duration: 0.2,
        type: "spring"
    }
  },
  visible: {
    x: "0"
  },
  exit: {
    x: "-15vw",
    transition: {
        duration: 0.2
    }
  }
}

export default dropInRight;