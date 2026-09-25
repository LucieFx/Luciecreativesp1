import React from "react";
import Image from "next/image";

export function HeroDevicePhone({ className = "" }: { className?: string; [key: string]: any }) {
  return (
    <div className={`relative w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[390px] select-none ${className}`}>
      <div className="relative w-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
        <Image
          src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835242/lucie-creatives/hero-iphone.png"
          alt="Lucie Creatives Official Instagram Profile on iPhone Titanium"
          width={750}
          height={846}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default HeroDevicePhone;
