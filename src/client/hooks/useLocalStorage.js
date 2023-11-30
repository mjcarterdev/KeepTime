import { useCallback, useEffect, useState } from 'react';

const getLocalStorageValue = (key) => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const useLocalStorage = (key) => {
  const [value, setValue] = useState(getLocalStorageValue(key));

  useEffect(() => {
    setValue(getLocalStorageValue(key));
  }, [key]);

  const setLocalStorageValue = useCallback(
    (newValue) => {
      const stringValue =
        typeof newValue === 'string' ? newValue : JSON.stringify(newValue);
      setValue(stringValue);
      localStorage.setItem(key, stringValue);
    },
    [key],
  );

  const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
  };

  return { value, setLocalStorageValue, removeLocalStorageItem };
};

export default useLocalStorage;
