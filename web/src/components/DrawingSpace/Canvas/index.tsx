import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash-es';

const CanvasDOM = styled.canvas`
  width: 100%;
  height: 100%;
`;

interface CanvasProps {}

const RESIZE_DELAY = 200;

const Canvas = React.forwardRef<HTMLCanvasElement | null, CanvasProps>(
  ({}: CanvasProps, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const debounceSetSize = debounce(setCanvasSize, RESIZE_DELAY);

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
            debounceSetSize({
              width: inlineSize,
              height: blockSize,
            });
          } else {
            debounceSetSize(entry.contentRect);
          }
        }
      });
      observer.observe(canvas);

      return () => {
        observer.unobserve(canvas);
      };
    }, [canvasRef.current]);

    // useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(
    //   ref,
    //   () => canvasRef.current
    // );

    return (
      <canvas
        id="draw-canvas"
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvasRef}
      />
    );
  }
);

export default Canvas;
