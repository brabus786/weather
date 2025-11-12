"use client";

import React, { FC, useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const PixiFirst: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initPixi = async () => {
      // Создаем приложение с новым синтаксисом для PixiJS 8.x
      const app = new PIXI.Application();
      await app.init({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
      });

      if (containerRef.current) {
        containerRef.current.appendChild(app.canvas);
      }

      // Создаем простую графику для демонстрации
      const graphics = new PIXI.Graphics();
      graphics.circle(400, 200, 50);
      graphics.fill(0xff0000);
      app.stage.addChild(graphics);
    };

    initPixi().catch(console.error);
  }, []);

  return <div ref={containerRef} />;
};
export default PixiFirst;
