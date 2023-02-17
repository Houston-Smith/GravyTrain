import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "./Login.css"

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/review"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    // <Form onSubmit={loginSubmit}>
    //   <fieldset>
    //     <FormGroup>
    //       <Label for="email">Email</Label>
    //       <Input
    //         id="email"
    //         type="text"
    //         autoFocus
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="password">Password</Label>
    //       <Input
    //         id="password"
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </FormGroup>
    //     <FormGroup>
    //       <Button>Login</Button>
    //     </FormGroup>
    //     <em>
    //       Not registered? <Link to="/register">Register</Link>
    //     </em>
    //   </fieldset>

    //   <fieldset className="LoginFieldset">

    //     <section>
    //       <b><p className="input-paragraph">Email</p></b> 
    //       <fieldset className="input-fieldset">
    //         <label htmlFor="locationName"></label>
    //         <input  type="text" id="locationName" onChange={(e) => setEmail(e.target.value)} required autoFocus className="form-control"/>
    //         </fieldset>
    //     </section>

    //     <section>
    //       <b><p className="input-paragraph">Password</p></b> 
    //       <fieldset className="input-fieldset">
    //         <label htmlFor="locationName"></label>
    //         <input  type="text" id="locationName" onChange={(e) => setPassword(e.target.value)} required autoFocus className="form-control"/>
    //         </fieldset>
    //     </section>

    //     <div className="form-buttons">

    //       <button className="login-button"
    //         onClick={loginSubmit}>
    //         Login
    //       </button>
          
    //       {/* <button className="register-button"
    //         onClick={navigate("/register")}>
    //         Register
    //       </button> */}

    //     </div>


    //   </fieldset>
    // </Form>

<fieldset className="LoginFieldset">

<section>
  <b><p className="input-paragraph">Email</p></b> 
  <fieldset className="input-fieldset">
    <label htmlFor="locationName"></label>
    <input  type="text" id="locationName" onChange={(e) => setEmail(e.target.value)} required autoFocus className="form-control"/>
    </fieldset>
</section>

<section>
  <b><p className="input-paragraph">Password</p></b> 
  <fieldset className="input-fieldset">
    <label htmlFor="locationName"></label>
    <input  type="text" id="locationName" onChange={(e) => setPassword(e.target.value)} required autoFocus className="form-control"/>
    </fieldset>
</section>

<div className="form-buttons">

  <button className="login-button"
    onClick={loginSubmit}>
    Login
  </button>
  
  <button className="register-button"
    onClick={() => {navigate(`/register`)}}>Register</button>

</div>


</fieldset>
  );
}