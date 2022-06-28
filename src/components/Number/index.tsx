import React, { useCallback, useState } from "react";
import { Container } from "./styles"
import Modal from '../Modal';

export interface Props {
    id?: number;
    cota: number;
    nome?: string;
    telefone?: string;
    status: string;
}

const Number: React.FC<Props> = (element) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const backgroundColor = () => {
        switch (element.status) {
            case 'LIVRE':
                return '#6bb39b';
            case 'RESERVADO':
                return '#ffbe0b';
            default:
                return '#ff8030';
        }
    }

    const updateShowModal = useCallback ((value: boolean) => {
        setIsShowModal(value);
    },[]); 

    return (
        <>
            <Container onClick={() => updateShowModal(true)} background={backgroundColor()}>
                {element.cota}
            </Container>
            <Modal title={`Cota ${element.cota}`} numberObject={element} open={isShowModal} handleClose={updateShowModal} />
        </>)
}

export default Number;