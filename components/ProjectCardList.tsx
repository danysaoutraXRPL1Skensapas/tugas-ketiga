"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Project {
  img: string;
  title: string;
  description: string;
  finished: boolean;
  techStack: string[];
}

interface ProjectCardListProps {
  data: Project[];
}

const ContainerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const Card = styled.button`
  padding: 0.3em;
  margin: 1rem;
  width: 315px;
  background-color: var(--surface);
  box-shadow: 5px 4px #000000ad;
  border: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #7aa2ff;
    outline-offset: 2px;
  }

  img {
    display: block;
  }
`;

const Dialog = styled.dialog`
  padding: 0;
  border: none;
  border-radius: 8px;
  width: min(520px, 90vw);
  background-color: #0f1c3f;
  color: #eaeaea;
  box-shadow: 5px 4px #000000ad;

  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const DialogBody = styled.div`
  padding: 1.25rem 1.5rem;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #eaeaea;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;

  &:focus-visible {
    outline: 2px solid #7aa2ff;
    outline-offset: 2px;
  }
`;

const Cover = styled.img`
  width: 100%;
  border-radius: 4px;
  margin: 1rem 0;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
`;

const TechItem = styled.li`
  background: #1e3468;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
`;

const Status = styled.span<{ $finished: boolean }>`
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ $finished }) => ($finished ? "#7ee787" : "#f0b429")};
`;

export default function ProjectCardList({ data }: ProjectCardListProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selected && !dialog.open) {
      dialog.showModal();
    } else if (!selected && dialog.open) {
      dialog.close();
    }
  }, [selected]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setSelected(null);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <>
      <ContainerList>
        {data?.map((project) => (
          <Card
            key={project.title}
            type="button"
            onClick={() => setSelected(project)}
            aria-haspopup="dialog"
          >
            <img src={project.img} alt={project.title} width="300" />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </Card>
        ))}
      </ContainerList>

      <Dialog
        ref={dialogRef}
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-desc"
        onClick={(e) => {
          // klik area backdrop → tutup
          if (e.target === e.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        {selected && (
          <DialogBody>
            <DialogHeader>
              <Title id="project-modal-title">{selected.title}</Title>
              <CloseButton
                type="button"
                aria-label="Tutup dialog"
                onClick={() => dialogRef.current?.close()}
              >
                ×
              </CloseButton>
            </DialogHeader>

            <Cover src={selected.img} alt={selected.title} />

            <p id="project-modal-desc">{selected.description}</p>

            <Status $finished={selected.finished}>
              {selected.finished ? "Selesai" : "Dalam pengerjaan"}
            </Status>

            {selected.techStack?.length > 0 && (
              <TechList>
                {selected.techStack.map((tech) => (
                  <TechItem key={tech}>{tech}</TechItem>
                ))}
              </TechList>
            )}
          </DialogBody>
        )}
      </Dialog>
    </>
  );
}