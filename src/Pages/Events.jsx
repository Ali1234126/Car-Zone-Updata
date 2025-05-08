import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'

function Events() {
  const [value, setValue] = useState("vcvfdvalue");
    function handleClick() {
      console.log("Button clicked!");
      setValue("ali");
    }
    console.log(handleClick); // تحقق مما إذا كانت الدالة معرّفة

  return (
    <div>
      <Header/>
      <h1>{value}</h1>
      <button  style={{ cursor: "pointer" }}  onClick={handleClick}>Click</button>
   {/* <Footer/> */}
    </div>
  )
}

export default Events
