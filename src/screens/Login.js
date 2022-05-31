import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

function Login() {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Log in!</button>
    </Container>
  );
}

export default Login;
