import { useEffect, useRef, useState } from "react";

interface GenkotsuDrawerProps {
  text: string;
}

const GenkotsuDrawer = ({ text }: GenkotsuDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = 1920 / 2;
  const height = 1080 / 2;
  const fontSize = 230;
  const descender = 0.88;

  const drawText = (
    text: string,
    fills: boolean,
    strokeStyle: string,
    context: CanvasRenderingContext2D
  ) => {
    context.fillStyle = "#000";
    context.strokeStyle = strokeStyle;
    context.lineWidth = 6;
    context.font = `${fontSize}px keifont`;
    context.textAlign = "center";

    const drawChar = (x: number, y: number, char: string, deg: number) => {
      const transformY = y + fontSize / 2;
      const radian = (deg / 360) * Math.PI * 2;
      context.translate(x, transformY);
      context.rotate(radian);
      context.strokeText(char, 0, fontSize * (-0.5 + descender));
      if (fills) {
        context.fillText(char, 0, fontSize * (-0.5 + descender));
      }
      context.rotate(-radian);
      context.translate(-x, -transformY);
    };

    const textWidth = fontSize * 2.2;
    const textHeight = fontSize * 2;

    const x = (width - textWidth) / 2;
    const x0 = x + fontSize * 0.5;
    const x1 = x + fontSize * (1.5 + 0.2);

    const y = (height - textHeight) / 2;
    const y0 = y;
    const y1 = y + fontSize;

    const xList = [x0, x1, x0, x1];
    const yList = [y0, y0, y1, y1];
    const degList = [-10, 8, -14, 4];
    for (let i = 0; i < Math.min(text.length, 4); i++) {
      drawChar(xList[i], yList[i], text[i], degList[i]);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (!context) {
        return;
      }

      // draw background
      const color0 = "#ec826a";
      const color1 = "#bf5677";
      const color2 = "#525abf";
      const gradient = context.createRadialGradient(
        width / 2,
        height / 2,
        height / 4,
        width / 2,
        height / 2,
        height
      );
      gradient.addColorStop(0, color0);
      gradient.addColorStop(0.3, color1);
      gradient.addColorStop(1, color2);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.fillStyle = "#ff6";
      context.beginPath();

      context.shadowColor = "rgba(255,255,255,0.4)";
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 60;

      for (let i = 0; i < 6; i++) {
        context.moveTo(width / 2, 0);
        const angle = (i - 3) * 0.06 + Math.random() * 0.1;
        const from = Math.abs(i - 3) * 60 + Math.random() * 20;
        const to = height - Math.random() * 80;
        const count = 20;

        const xList: number[] = [];
        const yList: number[] = [];

        for (let i = 0; i < count; i++) {
          xList.push(width / 2 + angle * 100 * i + Math.random() * 40);
          yList.push(((to - from) / count) * i + Math.random() * 30 + from);
          const x = xList[i] - 10;
          const y = yList[i] + 10;
          context.lineTo(x, y);
          console.log(x, y, "?");
        }
        for (let i = count; i >= 0; i--) {
          const x = xList[i] + 10;
          const y = yList[i];
          context.lineTo(x, y);
        }
        context.fill();
      }

      context.shadowColor = "transparent";
      context.shadowBlur = 0;

      // draw a base text
      const textCanvas = document.createElement("canvas");
      textCanvas.width = width;
      textCanvas.height = height;
      const textContext = textCanvas.getContext("2d");
      if (!textContext) {
        return;
      }

      // appearance
      const loops = 500;
      for (let i = 0; i < loops; i++) {
        textContext.clearRect(0, 0, width, height);
        const scale = 1.0 - (1.0 / loops) * i;
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const t = i / loops;
        const l0 = 60 + (1 - Math.pow(1 - t, 3)) * 40;
        drawText(text, false, `hsl(0, 100%, ${l0}%)`, textContext);
        context.drawImage(
          textCanvas,
          (width - scaledWidth) / 2,
          (height - scaledHeight) / 2,
          scaledWidth,
          scaledHeight
        );
      }
      drawText(text, true, "#fff", context);
    }
  }, [text]);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default GenkotsuDrawer;
