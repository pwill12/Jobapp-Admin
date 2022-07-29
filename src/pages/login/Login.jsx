import "./login.scss";

import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

// import { Mobile } from "../Mobile";
import { Link } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { mylogin } from "../../redux/AdminApiCalls";

const Con = styled.div`
  height: 100%;
`;

const Container = styled.div`
  width: 100vw;
  height: 88vh;
  // background-color: rgb(240, 241, 245);
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  justify-content: center;
  ${
    "" /* ${Mobile({ background: '-webkit-linear-gradient(-45deg, #83c3e3 50%, #ec94ec 50%)' })} */
  }
`;

const CenterLogo = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  ${"" /* position: absolute; */}
`;

const Wrapper = styled.div`
  width: 28%;
  border-radius: 10px;
  ${"" /* height: 70vh; */}
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: teal;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
//   &:disabled {
//     color: green;
//     cursor: not-allowed;
//   }
// `;

const Links = styled.div`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    // e.preventDefault();
    mylogin(dispatch, { email, password });
  };

  //   disabled={isFetching}

  return (
    <Con>
      <Container>
        <CenterLogo>
          Welcome Back....Admin
          <i class="fas fa-laptop-code" style={{ color: "black" }}></i>
        </CenterLogo>
        <Wrapper>
          {/* <CenterLogo>
          WillJobs
      </CenterLogo> */}
          <Title>SIGN IN</Title>
          <Form>
            {/* <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="username"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={(e) => setemail(e.target.value)}
              />
            </Grid>
            {/* <Input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                sx={{ mt: 3 }}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {/* <Button onClick={handleClick}>LOGIN</Button> */}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign in
            </Button>
            {/* {error ? <Error>username or Password Incorrect...</Error> : null} */}
            <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
            {/* <Link to="/register">
              <Links>CREATE A NEW ACCOUNT</Links>
            </Link> */}
            {/* <Links>CREATE A NEW ACCOUNT</Links> */}
          </Form>
        </Wrapper>
      </Container>
    </Con>
  );
}
