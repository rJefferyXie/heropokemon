const changeTheme = (theme: string) => {
  return {
    type: 'change',
    payload: {
      theme
    }
  }
}

export default changeTheme;