import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
// import useStateAsync from "react-use-state-async";

interface LoginFormInput {
  email: string;
  password: string;
}

export default function () {
  // const [formDisabled, setFormDisabled] = useStateAsync(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
    console.log("SUBMITTED");
  };

  return (
    <Container className="vh100">
      <Row>
        {/* <Col xs={12}></Col> */}
        <Col
          xs={8}
          className="mx-auto vh100 d-flex flex-column justify-content-center"
        >
          <div className="paper">
            <div className="title-login text-center mb-3">LOGIN</div>
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
                className="btn-login"
                disabled={!!Object.keys(errors).length}
                type="submit"
              />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
