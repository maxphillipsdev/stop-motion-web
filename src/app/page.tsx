"use client";
import { useEffect, useRef } from "react";
import { Camera } from "web-gphoto2";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<Camera>(new Camera());

  const handleClick = async () => {
    await Camera.showPicker();
    await cameraRef.current.connect();

    console.log(
      "Operations supported by the camera:",
      await cameraRef.current.getSupportedOps(),
    );
    console.log(
      "Current configuration tree:",
      await cameraRef.current.getConfig(),
    );
  };

  const enablePreview = async () => {
    // https://github.com/GoogleChromeLabs/web-gphoto2/blob/0d17b35897c2037d59a0ca3c845052b53830770c/examples/preact/preview.js#L87
    await new Promise((resolve) => setTimeout(resolve, 1500));

    while (canvasRef.current) {
      try {
        const blob = await cameraRef.current.capturePreviewAsBlob();

        const image = await createImageBitmap(blob);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        const canvasCtx = canvasRef.current.getContext("bitmaprenderer");
        if (!canvasCtx) continue;

        canvasCtx.transferFromImageBitmap(image);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!cameraRef.current) return;

    // cameraRef.current && enablePreview();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <canvas
        ref={canvasRef}
        width="500"
        height={500}
        className="bg-white"
      ></canvas>
      <button type="button" onClick={handleClick}>
        Connect camera
      </button>
      <button type="button" onClick={enablePreview}>
        jkasdbnfjk
      </button>
    </main>
  );
}
