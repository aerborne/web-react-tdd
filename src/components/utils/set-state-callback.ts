import { useState } from "react";

const useStateWithCallback = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  const setValueAndCallback = (newValue: any, callback: Function) => {
    setValue((prevValue: any) =>
      callback ? callback(prevValue, newValue) : newValue
    );
  };

  return [value, setValueAndCallback];
};

export { useStateWithCallback };
