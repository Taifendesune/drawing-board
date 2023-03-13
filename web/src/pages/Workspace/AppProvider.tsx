import React, { useEffect, useRef } from 'react';
import Renderer from '@/app/renderer/Renderer';

const AppContext = React.createContext<Renderer | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const renderer = useRef<Renderer | null>(null);

  useEffect(() => {
    const canvas = document.getElementById('draw-canvas') as HTMLCanvasElement;
    if (!canvas) {
      throw Error('初始化 Canvas 失败');
    }
    renderer.current = new Renderer(canvas);
  }, []);

  return (
    <AppContext.Provider value={renderer.current}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
