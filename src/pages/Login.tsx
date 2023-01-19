import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginAPI } from "../components/api/index";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function () {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setLoading(true);
    try {
      const result = await loginAPI(data);
      if (result.status === 200) {
        localStorage.setItem("user_access_token", result?.data?.access_token);
        localStorage.setItem("user_info", JSON.stringify(result?.data?.user));
        localStorage.setItem("user_roles", JSON.stringify(result?.data?.roles));
        // navigate("/");
        window.location.href = "/";
      } else {
        return setErrorMessage("Invalid Email and Password ");
      }
    } catch (err) {
      setErrorMessage("Invalid Email and Password ");
    }
    setLoading(false);
  };

  return (
    <Container className="vh100 login-page" data-testid="login-page">
      <Row>
        {/* <Col xs={12}></Col> */}
        <Col
          xs={8}
          lg={6}
          xl={4}
          className="mx-auto vh100 d-flex flex-column justify-content-center"
        >
          <div className="paper">
            <div className="title-login text-center mb-3">
              {/* <span className="mr-3">
                <FontAwesomeIcon icon={faUser} />
              </span> */}
              <div className="ml-3" data-testid="login-title">
                LOGIN
              </div>
            </div>
            {errorMessage && (
              <Row>
                <Col>
                  <div className="alert alert-danger">{errorMessage}</div>
                </Col>
              </Row>
            )}
            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="mb-3"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                })}
              />
              <input
                className="mb-3"
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
              <input
                value={loading ? "Loading..." : "Login"}
                className="btn-login"
                disabled={!!Object.keys(errors).length || loading}
                type="submit"
              />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
