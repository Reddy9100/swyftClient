import React, { useEffect, useState } from 'react';
import ScreenSaver from '../assets/ScreenSaver.gif';
import Dashboard from './Dashboard';

const InitialScreen = () => {
  const [isScreenSaverActive, setIsScreenSaverActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenSaverActive(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isScreenSaverActive ? (
        <div className='flex justify-center items-center h-[100vh]'>
          <div>
            <img src={ScreenSaver} className='w-56 m-auto rounded-tr-[20%] rounded-bl-[20%] ' alt="Screen Saver"/>
          </div>
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default InitialScreen;
