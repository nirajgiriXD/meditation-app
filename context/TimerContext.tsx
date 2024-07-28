/**
 * External dependencies.
 */
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface TimerContextProp {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

interface TimerProviderProp {
  children: ReactNode;
}

export const TimerContext = createContext<TimerContextProp>({
  duration: 60,
  setDuration: () => {},
});

const TimerProvider = ({ children }: TimerProviderProp) => {
  const [duration, setDuration] = useState(60);

  return (
    <TimerContext.Provider value={{ duration, setDuration }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
