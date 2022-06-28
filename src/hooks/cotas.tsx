import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import api from "../service/api";

interface Cota {
  cota: number;
  nome: string;
  telefone: string;
  status: string;
}

interface CotasContextData {
  cotas: Cota[];
  save(cota: Cota, senha: string): Promise<void>;
  update(cota: Cota, senha: string): Promise<void>;
  deleted(cota: number, senha: string): Promise<void>;
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
      const response = await api.get<Cota[]>("/cotas");
      setCotas(response.data);
    } catch (error: any) {
      alert(error);
    }
  }, []);

  const save = useCallback(
    async (cota: Cota, senha: string) => {
      await api.post("/cotas", cota, {
        headers: {
            senha: senha
        }
      });
      await getAll();
    },
    [getAll]
  );

  const update = useCallback(
    async (cota: Cota, senha: string) => {
      await api.put(`/cotas/${cota.cota}`, cota, {
        headers: {
            senha: senha
        }
      });
      await getAll();
    },
    [getAll]
  );

  const deleted = useCallback(
    async (cota: number, senha: string) => {
      await api.delete(`/cotas/${cota}`, {
        headers: {
          senha: senha
        }
      });
      await getAll();
    },
    [getAll]
  );

  return (
    <CotasContext.Provider value={{ cotas: cotas, getAll, save, update, deleted }}>
      {children}
    </CotasContext.Provider>
  );
};

function useCota(): CotasContextData {
  const context = useContext(CotasContext);

  if (!context) {
    throw new Error("useCota must be used within an CotasProvider");
  }

  return context;
}

export { CotasProvider, useCota };
