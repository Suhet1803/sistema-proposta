import { useEffect, useState } from 'react';

export const Countdown = () => {
  const [daysCount, setDaysCount] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const targetDate = new Date('2023-12-31');  // Substitua pela sua data desejada

    const differenceInTime = targetDate - currentDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    setDaysCount(differenceInDays);
  }, []);

  return (
    <div>
      <h2>Contagem regressiva até {targetDate.toDateString()}</h2>
      <p>Número de dias: {daysCount}</p>
    </div>
  );
};
