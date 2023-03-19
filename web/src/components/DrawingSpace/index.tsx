import { useEffect, useMemo, useRef, useCallback } from 'react';
import Toolbar from '@components/Toolbar';
import CanvasContainer from './CanvasContainer';
import { useApp } from '@/pages/PlaySpace/AppProvider';

const DrawingSpace = () => {
  const app = useApp();

  const listenResize = useCallback(
    (width: number, height: number) => {
      app?.renderer.resize(width, height);
    },
    [app]
  );

  return (
    <>
      <CanvasContainer onResize={listenResize} />
      <Toolbar />
    </>
  );
};

export default DrawingSpace;
