"use client";

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface WatermarkProps extends Omit<ComposableProps<'div'>, 'content'> {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  image?: string;
  content?: string | string[];
  font?: {
    color?: string;
    fontSize?: number | string;
    fontWeight?: 'normal' | 'light' | 'weight' | number;
    fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
    fontFamily?: string;
  };
  gap?: [number, number];
  offset?: [number, number];
  children?: React.ReactNode;
  className?: string;
}

export const Watermark: React.FC<WatermarkProps> = ({
  zIndex = 9,
  rotate = -22,
  width = 120,
  height = 64,
  image,
  content,
  font = {},
  gap = [100, 100],
  offset,
  children,
  className,
  asChild,
  ...props
}) => {
  const [base64Url, setBase64Url] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = window.devicePixelRatio || 1;
    
    const config = {
      color: 'rgba(0, 0, 0, 0.15)',
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'sans-serif',
      ...font,
    };

    const canvasWidth = (gap[0] + width) * ratio;
    const canvasHeight = (gap[1] + height) * ratio;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = `${gap[0] + width}px`;
    canvas.style.height = `${gap[1] + height}px`;

    if (ctx) {
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((Math.PI / 180) * rotate);
      ctx.scale(ratio, ratio);
      
      const markWidth = width;
      const markHeight = height;

      if (image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
        img.onload = () => {
          ctx.drawImage(img, -markWidth / 2, -markHeight / 2, markWidth, markHeight);
          setBase64Url(canvas.toDataURL());
        };
      } else if (content) {
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = config.color as string;
        ctx.font = `${config.fontStyle} ${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
        
        if (Array.isArray(content)) {
             content.forEach((item, index) => {
                 ctx.fillText(item, 0, (index - (content.length - 1) / 2) * (typeof config.fontSize === 'number' ? config.fontSize : 16) * 1.5);
             });
        } else {
            ctx.fillText(content, 0, 0);
        }
        setBase64Url(canvas.toDataURL());
      }
    }
  }, [zIndex, rotate, width, height, image, content, font, gap, offset]);

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp 
        ref={containerRef} 
        className={cn("relative overflow-hidden", className)}
        style={{ position: 'relative' }}
        {...props}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
            zIndex,
            backgroundSize: `${gap[0] + width}px ${gap[1] + height}px`,
            backgroundImage: `url('${base64Url}')`,
            backgroundRepeat: 'repeat',
            ...(offset ? { backgroundPosition: `${offset[0]}px ${offset[1]}px` } : {}),
        }}
      />
    </Comp>
  );
};

Watermark.displayName = 'Watermark';

