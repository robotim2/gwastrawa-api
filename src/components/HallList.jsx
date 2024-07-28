import React, { useEffect, useState } from 'react';
import HallAccordion from './HallAccordion';
import { getHalls } from '../api';

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHalls = async () => {
      const data = await getHalls();
      setHalls(data);
      setLoading(false);
    };

    fetchHalls();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {halls.map((hall) => (
        <HallAccordion key={hall.id} hall={hall} />
      ))}
    </div>
  );
};

export default HallList;
