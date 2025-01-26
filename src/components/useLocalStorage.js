import React, { useEffect, useState } from "react";

function useLocalStorage(key, _item) {
  const [item, setItem] = useState(() => {
    const localItem = localStorage.getItem(key);

    if (localItem) {
      return JSON.parse(localItem);
    } else {
      return _item;
    }
  });

  useEffect(() => {
    if (item) localStorage.setItem(key, JSON.stringify(item));
  }, [item, key]);

  return [item, setItem];
}

export default useLocalStorage;
