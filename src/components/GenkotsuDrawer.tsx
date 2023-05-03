import { useEffect, useRef, useTransition } from "react";
import styled from "styled-components";
import { createGif, drawGenkotsu, drawerHeight, drawerWidth } from "@/libs/draw";

const maxWidth = 400 * (16 / 9);

const Wrapper = styled.section`
  width: 100%;
  max-width: ${maxWidth}px;
`;

const Canvas = styled.canvas`
  height: 400px;

  @media screen and (max-width: ${maxWidth + 32 * 2}px) {
    width: 100%;
    height: auto;
  }
`;

const Navigation = styled.div`
  display: flex;

  @media screen and (max-width: ${maxWidth + 32 * 2}px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Download = styled.a`
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin: 16px auto 0 auto;
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  display: block;
`;

interface GenkotsuDrawerProps {
  text: string;
}

const GenkotsuDrawer = ({ text }: GenkotsuDrawerProps) => {
  const [_, startTransition] = useTransition();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startTransition(() => {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (!context) {
          return;
        }
        document.fonts.ready.then(() =>
          drawGenkotsu(text, drawerWidth, drawerHeight, context)
        )
      }
    });
  }, [text]);

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL("image/png");
      link.download = "genkotsu.png";
      link.click();
    }
  };

  const downloadGif = () => {
    createGif(text);
  };

  return (
    <Wrapper>
      <Canvas width={drawerWidth} height={drawerHeight} ref={canvasRef} />
      <Navigation>
        <Download onClick={downloadImage}>画像をダウンロード</Download>
        <Download onClick={downloadGif}>GIF 画像をダウンロード</Download>
      </Navigation>
    </Wrapper>
  );
};

export default GenkotsuDrawer;
