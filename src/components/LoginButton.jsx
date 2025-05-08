import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/LoginPage')
  }

  return (
    <button className="btnLogin" onClick={handleLogin}>
      Login
    </button>
  )
}

export default LoginButton
