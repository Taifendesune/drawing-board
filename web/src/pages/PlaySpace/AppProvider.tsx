import React, { useEffect, useState, useContext } from 'react';
import DrawingBoard from '@/app';

const AppContext = React.createContext<DrawingBoard | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [app, setApp] = useState<DrawingBoard | null>(null);

  useEffect(() => {
    // 这里应该实例化 DrawBoard, render 只管渲染
    const container = document.getElementById('canvas-container');
    if (!container) {
      throw Error('初始化 Canvas 失败');
    }
    setApp(new DrawingBoard({ container }));
  }, []);

  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const app = useContext(AppContext);
  return app;
};

export default AppProvider;
