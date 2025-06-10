import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiBars3 } from "react-icons/hi2";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 6.1rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.4rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 2.4rem;
  color: var(--color-grey-500);
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export default function Header({ showToggleButton, onToggleSidebar }) {
  return (
    <StyledHeader>
      <Left>
        {showToggleButton && (
          <ToggleButton onClick={onToggleSidebar}>
            <HiBars3 />
          </ToggleButton>
        )}
      </Left>
      <Right>
        <UserAvatar />
        <HeaderMenu />
      </Right>
    </StyledHeader>
  );
}
