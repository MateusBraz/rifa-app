import React from "react";
import { Container } from "./style";
import imgTemploIgreja from "../../assets/imagem-igreja.jpg";
import imgCel from "../../assets/redmi-note-11.jpg";

const Description: React.FC = () => {
  return (
    <Container style={{ flexDirection: 'column'}}>
      <h1>Rifa em prol da finalização da construção do templo da Igreja CEIAV em Aurora do Pará.</h1>
      <img style={{ width: '80%'}} src={imgTemploIgreja} alt="Templo" />
      <h1>Ajude comprando um ou mais números e concorra a um Smartphone Redmi Note 11 4GB RAM 128GB ROM Star Blue. Cada número custa apenas R$ 5,00.</h1>
      <img style={{ width: '60%'}} src={imgCel} alt="Celular" />
      <h1>Após escolher seu número, envie para um de nossos responsáveis para fazer a reserva.</h1>
      <br />
      <strong>PROGRESSO</strong>
    </Container>
  );
};

export default Description;
