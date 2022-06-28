import React, { useEffect, useMemo, useState } from "react";
import { Content, ProgressBar, Container } from "./styles";
import Number from "../Number";
import { useCota } from "../../hooks/cotas";

const numbers = Array.from({ length: 1500 }, (_, i) => i + 1);

interface NumberObject {
    id?: number;
    cota: number;
    nome?: string;
    telefone?: string;
    status: string;
}

const Numbers: React.FC = () => {
    const { cotas } = useCota();
    const [listNumber, setListNumber] = useState<NumberObject[]>(new Array<NumberObject>());


    useEffect(() => {
        setListNumber(numbers.map(n => {
            const cotaFilter = cotas.filter(c => c.cota === n)[0];
            if (cotaFilter !== undefined) {
                return cotaFilter;
            }
            return { cota: n, status: 'LIVRE' }
        }))
    }, [cotas]);

    const totalLivres = useMemo(() => {
        return listNumber.filter(n => n.status === 'LIVRE').length
    }, [listNumber]);

    const totalReservados = useMemo(() => {
        return listNumber.filter(n => n.status === 'RESERVADO').length
    }, [listNumber]);

    const totalPagos = useMemo(() => {
        return listNumber.filter(n => n.status === 'PAGO').length
    }, [listNumber]);

    const progressNumber = useMemo(() => {
        const totalPagos = listNumber.filter(n => n.status === 'PAGO').length;
        const totalElementos = listNumber.length;
        const percentualPagos = ((totalPagos * 100) / totalElementos);
        return percentualPagos;
    }, [listNumber])

    return (
        <Content>
            <ProgressBar progress={progressNumber}>
                <p><strong>{progressNumber.toFixed(2)}%</strong></p>
                <div />
            </ProgressBar>

            <div className="title">
                <div className="description">
                    <p>livres</p>
                    <div style={{ background: "#6bb39b" }}><strong>{totalLivres}</strong></div>
                </div>

                <div className="description">
                    <p>reservados</p>
                    <div style={{ background: "#ffbe0b" }}><strong>{totalReservados}</strong></div>
                </div>

                <div className="description">
                    <p>pagos</p>
                    <div style={{ background: "#ff8030" }} ><strong>{totalPagos}</strong></div>
                </div>
            </div>
            <Container>
                {listNumber.map(value => (<Number key={value.cota} {...value} />))}
            </Container>
        </Content>
    );
}

export default Numbers;