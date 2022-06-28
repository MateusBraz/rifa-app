import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../service/api';

interface Cota {
    cota: number;
    nome: string;
    telefone: string;
    status: string;
}

interface CotasContextData {
    cotas: Cota[];
    save(cota: Cota): Promise<void>;
    getAll(): Promise<void>;
}

const CotasContext = createContext<CotasContextData>({} as CotasContextData);

const CotasProvider: React.FC<any> = ({ children }) => {
    const [cotas, setCotas] = useState<Cota[]>(new Array<Cota>());

    useEffect(() => {
        getAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAll = useCallback(async () => {
        try {
            const response = await api.get<Cota[]>('data.json');
            if (response.data) {
                setCotas(response.data);
            }
        } catch (error: any) {
            alert(error);
        }
    }, []);

    const save = useCallback(async (cota: Cota) => {
        await api.put('data.json', [...cotas, cota]);
        await getAll();
    }, [cotas, getAll]);

    return (
        <CotasContext.Provider
            value={{ cotas: cotas, save, getAll }}
        >
            {children}
        </CotasContext.Provider>
    );
};

function useCota(): CotasContextData {
    const context = useContext(CotasContext);

    if (!context) {
        throw new Error('useCota must be used within an CotasProvider');
    }

    return context;
}

export { CotasProvider, useCota };
