import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash-es';
import { useApp } from '@/pages/PlaySpace/AppProvider';

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
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

    const debounceSetSize = debounce(onResize, RESIZE_DELAY);

    // 考虑浏览器兼容性
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          // Firefox implements `contentBoxSize` as a single content rect, rather than an array
          const { inlineSize, blockSize }: ResizeObserverSize = Array.isArray(
            entry.contentBoxSize
          )
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          debounceSetSize(inlineSize, blockSize);
        } else {
          const { width, height } = entry.contentRect;
          debounceSetSize(width, height);
        }
      }
    });
    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [containerRef.current]);

  return <StyledDiv ref={containerRef} id="canvas-container" />;
};

export default CanvasContainer;
