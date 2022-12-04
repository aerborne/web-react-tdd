import { useState } from "react";

const useStateWithCallback = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const setValueAndCallback = (newValue, callback) => {
    setValue((prevValue) =>
      callback ? callback(prevValue, newValue) : newValue
    );
  };

  return [value, setValueAndCallback];
};

export { useStateWithCallback };
