import styled from "styled-components";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  padding: 2rem;

  @media (min-width: 540px) {
    grid-template-columns: 48rem;
  }

  @media (max-width: 539px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading type="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
