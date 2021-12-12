import { createContext, useContext } from "react";

import { Hint } from "../entities/Hint";
import { createOneBase, getManyBase } from "../services/common";
import { hintResource } from "../services/hint";

export interface HintAPI {
  createOne(HintDto: Hint): Promise<Hint>;
  getMany(): Promise<Hint[]>;
}

export const HintContext = createContext<HintAPI>({} as HintAPI);

export const HintProvider: React.FC = ({ children }) => {
  const createOne = async (hintDto: Hint): Promise<Hint> => {
    const hint = new Hint(hintDto);

    return (
      (await createOneBase<Hint>({
        resource: hintResource,
        data: hint,
      })) || ({} as Hint)
    );
  };

  const getMany = async () => {
    return (
      (await getManyBase<Hint>({
        resource: hintResource,
      })) || []
    );
  };

  return (
    <HintContext.Provider value={{ createOne, getMany }}>
      {children}
    </HintContext.Provider>
  );
};

export const useHint = (): HintAPI => {
  const context = useContext(HintContext);

  if (!context) {
    throw new Error("useHint must be within a HintContext");
  }

  return context;
};
