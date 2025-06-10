import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  ${(props) =>
    props.tableScroll === "scroll" &&
    css`
      @media (max-width: 768px) {
        overflow-x: auto;
      }
    `}
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  min-width: 700px;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }

  @media (max-width: 768px) {
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    overflow-x: auto;

    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 100%;
      background: linear-gradient(to left, var(--color-grey-200), transparent);
      pointer-events: none;
    }
  }
`;

const TableContext = createContext();

export default function Table({ children, columns, tableScroll }) {
  return (
    <TableContext.Provider value={{ columns }}>
      {tableScroll ? (
        <ScrollWrapper>
          <StyledTable role="table" tableScroll={tableScroll}>
            {children}
          </StyledTable>
        </ScrollWrapper>
      ) : (
        <StyledTable role="table" tableScroll={tableScroll}>
          {children}
        </StyledTable>
      )}
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data?.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
