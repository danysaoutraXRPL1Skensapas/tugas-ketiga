"use client";
import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 0 0 9px 9px;
  background-color: var(--nav-bg);
  color: var(--text);
  position: relative;
  top: 0;
  transition: background-color 0.2s ease, color 0.2s ease;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Burger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  border-radius: 0.75rem;
  background-color: var(--nav-burger-bg);
  color: var(--text-muted);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: 100;

  &:hover {
    color: var(--text);
    border-color: var(--accent);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: var(--nav-burger-bg);
  color: var(--text);
  border: 1px solid var(--border);
  cursor: pointer;
  position: relative;
  z-index: 100;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const NavMenu = styled.ul<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 20px 20px 20px;
  list-style: none;
  background-color: var(--nav-menu-bg);
  transition: transform 0.3s ease-in-out, background-color 0.2s ease;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};

  a {
    color: var(--nav-link);
    text-decoration: none;
    font-size: 1.1rem;
  }

  @media (min-width: 768px) {
    position: static;
    width: auto;
    height: auto;
    flex-direction: row;
    padding: 0;
    background-color: transparent;
    transform: none;
  }
`;

export default function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);
  const { theme, toggleTheme } = useTheme();

  function toggleNav() {
    setIsNavActive((prev) => !prev);
  }

  const nextLabel =
    theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap";

  return (
    <NavContainer>
      <h2>Dany saputra</h2>

      <RightGroup>
        <NavMenu $isOpen={isNavActive}>
          <li>
            <a href="/" onClick={toggleNav}>
              Home
            </a>
          </li>
          <li>
            <a href="/projects" onClick={toggleNav}>
              Project
            </a>
          </li>
          <li>
            <a href="/contact" onClick={toggleNav}>
              Contact
            </a>
          </li>
        </NavMenu>

        <ThemeToggle
          type="button"
          onClick={toggleTheme}
          aria-label={nextLabel}
          title={nextLabel}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </ThemeToggle>

        <Burger
          type="button"
          aria-label="Buka menu navigasi"
          aria-expanded={isNavActive}
          onClick={toggleNav}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </Burger>
      </RightGroup>
    </NavContainer>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}