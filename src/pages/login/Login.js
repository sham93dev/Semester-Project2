import React from "react";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <section className="sign-in-section">
      <div className="sign-in-container">
        <h1>Sign in for admin dashboard</h1>
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
