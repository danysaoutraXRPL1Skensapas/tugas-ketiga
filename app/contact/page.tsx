"use client";

import { useState, FormEvent } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--surface);
  border-radius: 8px;
  box-shadow: 5px 4px 12px #000000ad;
  color: #ffffff;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #2c3e60;
  border-radius: 4px;
  background-color: var(--surface-3);
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #4a90e2;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #2c3e60;
  border-radius: 4px;
  background-color: var(--surface-3);
  color: #ffffff;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: 2px solid #4a90e2;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: #2563eb;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:danyid.dev@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <Container>
      <Title>Hubungi Kami</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            type="text"
            required
            placeholder="Masukkan nama Anda"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="nama@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Subjek</Label>
          <Input
            id="subject"
            type="text"
            required
            placeholder="Subjek pesan"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Pesan</Label>
          <TextArea
            id="message"
            required
            placeholder="Tuliskan pesan Anda di sini..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </FormGroup>

        <Button type="submit">Kirim Pesan</Button>
      </Form>
    </Container>
  );
}