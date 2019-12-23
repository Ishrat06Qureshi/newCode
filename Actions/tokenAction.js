class TokenAction {
  static TOKEN_SAVE = "TOKEN_SAVE";
  static TOKEN_REMOVE = "TOKEN_REMOVE";
  static TOKEN_SAVE_ACTION = ( token ) => {
      return ({
          type:this.TOKEN_SAVE,
          token
      })
  }

  static TOKEN_REMOVE_ACTION = () => {
    return ({
        type:this.TOKEN_REMOVE,
        token:""
    })
}

}


export default TokenAction