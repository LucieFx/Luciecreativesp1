import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { WHATSAPP_CONFIG } from "@/lib/constants";

export function WhatsAppQR() {
  return (
    <div className="whatsapp-qr-container flex flex-col items-center">
      <div className="bg-white p-3 rounded-2xl border border-line shadow-sm inline-flex items-center justify-center">
        <QRCodeSVG
          value={WHATSAPP_CONFIG.defaultLink}
          size={160}
          level="M"
          fgColor="#111111"
          bgColor="#ffffff"
          marginSize={2}
          role="img"
          aria-label="QR code to message Lucie Creatives on WhatsApp"
        />
      </div>
      <p className="mt-2 text-xs font-semibold text-muted text-center">
        Scan to chat on WhatsApp
      </p>
    </div>
  );
}

export default WhatsAppQR;
