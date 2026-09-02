"use client";
import Image from "next/image";

export default function SynapseLogo({ size = 48, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.6))',
        ...style 
      }}
    >
      <Image
        src="/logo-v2.png"
        alt="NEURA402 Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  );
}
