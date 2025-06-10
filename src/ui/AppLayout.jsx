import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
  width: 100%;
  padding-top: 10rem;
  overflow-x: hidden;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Backdrop = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }

  display: ${(props) => (props.$isVisible ? "block" : "none")};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = () => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  return (
    <StyledAppLayout>
      <Header
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        showToggleButton={window.innerWidth < 1024}
      />
      <MainWrapper>
        <Backdrop
          $isVisible={isSidebarOpen && window.innerWidth < 1024}
          onClick={() => setIsSidebarOpen(false)}
        />
        <Sidebar isOpen={isSidebarOpen} onNavClick={handleNavClick} />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </MainWrapper>
    </StyledAppLayout>
  );
}
