import React from "react";
import { Container } from "./style";
import imgCel from "../../assets/redmi-note-11.jpg";

const Description: React.FC = () => {
  return (
    <Container style={{ flexDirection: 'column'}}>
      <img style={{ width: '80%'}} src={imgCel} alt="Celular" />
      <strong>PROGRESSO</strong>
    </Container>
  );
};

export default Description;
