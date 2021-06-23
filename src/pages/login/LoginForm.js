import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import LoginError from "../../components/common/LoginError";
import { LOGIN_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { Form, Button, Container } from "react-bootstrap";

const schema = yup.object().shape({
  identifier: yup.string().required("Enter your username"),
  password: yup.string().required("Enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(LOGIN_URL, data);
      console.log("response", response.data);
      setAuth(response.data);
      history.push("/admin");
    } catch (error) {
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Container className="sign-in-form-container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={submitting}>
            <Form.Group controlId="formBasicEmail">
              {errors.username && <LoginError>{errors.username.message}</LoginError>}
              <Form.Label>Username:</Form.Label>
              <Form.Control name="username" placeholder="Enter username" {...register("identifier")} />
              {errors.username && <LoginError>{errors.username.message}</LoginError>}
              <Form.Text className="text-muted"> Username: admin@wikisite.com </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" {...register("password")} />
              {errors.password && <LoginError>{errors.password.message}</LoginError>}
              <Form.Text className="text-muted"> Password: Admin123 </Form.Text>
            </Form.Group>
            <Button className="login-button" variant="success" type="submit">
              Login
            </Button>
          </fieldset>
        </Form>
      </Container>
    </>
  );
}
