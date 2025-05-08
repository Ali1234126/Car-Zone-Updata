import React from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterButton() {
      const navigate = useNavigate()
      const handleLogin = () => {
        navigate('/RegistrationPage')
      }
  return (
    <div>
      <button className="btnReg" onClick={handleLogin}>
       Sgin up
    </button>
    </div>
  )
}

export default RegisterButton
