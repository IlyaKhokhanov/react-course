import { createContext } from 'react';
import { IState } from '../../types';

export const Context = createContext<
  [IState, React.Dispatch<React.SetStateAction<IState>>] | undefined
>(undefined);
