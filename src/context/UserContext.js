import React from 'react'

const UserContext = React.createContext({
  username: '',
  password: '',
  updateUsername: () => {},
  updatePassword: () => {},
})

export default UserContext
