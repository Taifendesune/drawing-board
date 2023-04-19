import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash-es';
import { useApp } from '@/pages/PlaySpace/AppProvider';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface ContainerProps {
  onResize: (width: number, height: number) => void;
}

const RESIZE_DELAY = 200;

const CanvasContainer = ({ onResize }: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 需要用就抽成 hook
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = debounce(() => {
      onResize(
        Math.round(container.clientWidth),
        Math.round(container.clientHeight)
      );
    }, RESIZE_DELAY);

    window.addEventListener('resize', handleResize);

    return () => {
      // observer.unobserve(container);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef.current]);

  return <StyledDiv ref={containerRef} id="canvas-container" />;
};

export default CanvasContainer;
