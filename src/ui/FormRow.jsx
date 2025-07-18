import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  ${(props) =>
    props.login === "login" &&
    css`
      grid-template-columns: 0.5fr 1fr;
    `}

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    padding-top: 2rem;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
    ${(props) =>
      props.modalForm === "modalForm" &&
      css`
        @media (max-width: 768px) {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      `}
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, login, modalForm }) {
  return (
    <StyledFormRow login={login} modalForm={modalForm}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
