import { useState, useEffect } from "react";

const useTruncate = (text: string, maxLength: number = 100) => {
  const [truncatedDescription, setTruncatedDescription] = useState(text);

  useEffect(() => {
    if (text.length > maxLength) {
      setTruncatedDescription(`${text.slice(0, maxLength)}...`);
    } else {
      setTruncatedDescription(text);
    }
  }, [text, maxLength]);

  return truncatedDescription;
};

export default useTruncate;
