import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transition: all 0.3s ease;

  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    z-index: 1100;
    padding-top: 4rem;
    height: 100vh;
    width: 30rem;
  }

  @media (max-width: 1023px) {
    z-index: 1100;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    background-color: var(--color-grey-0);
    position: fixed;
    top: 0;
    left: 0;
    width: 25rem;
    height: 100%;
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

export default function Sidebar({ isOpen, onNavClick }) {
  return (
    <StyledSidebar $isOpen={isOpen}>
      <Logo />
      <MainNav onNavClick={onNavClick} />
    </StyledSidebar>
  );
}
