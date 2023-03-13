import Render from '@/app/renderer/Renderer';
import { useEffect, useMemo, useRef } from 'react';
import Toolbar from '@components/Toolbar';
import Canvas from './Canvas';

const DrawingSpace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   console.log('rener', canvasRef.current);
  // }, [canvasRef.current]);

  // useEffect(() => {
  //   render?.requestRender();
  // }, [render]);

  return (
    <>
      <Canvas />
      <Toolbar />
    </>
  );
};

export default DrawingSpace;
