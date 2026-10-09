"use client";
import { useEffect, useRef } from "react";
import styled from "styled-components"
import Typed from "typed.js"

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 82px); /* full viewport height - navbar 82px (callculate from devtools) */
  padding: 8px 50px;
`

export default function Hero() {
  const typedEl = useRef(null);
  useEffect(() => {
    if (!typedEl.current) return;

    const typed = new Typed(typedEl.current, {
      strings: ["Dany Saputra", "X RPL 1", "SMKN 1 Pasuruan"],
      typeSpeed: 150,
      backSpeed: 40,
      backDelay: 500,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <HeroContainer>
      <h1 ref={typedEl}></h1>
      <p>"I am a student who aspires to become a software architect. Currently, I am focusing on mastering Docker and understanding common software design patterns."</p>
    </HeroContainer>
  )
}