import React, { useEffect, useState } from 'react';
import * as QRCode from 'qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Animals } from '@/types/animalsTypes';

interface QRCodeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  animals: Animals[];
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ isOpen, onClose, animals }) => {
  const [qrCodesHTML, setQrCodesHTML] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      generateQRCodes();
    }
  }, [isOpen, animals]);

  const generateQRCodes = async () => {
    const qrPromises = animals.map(async (animal) => {
      const qrData = JSON.stringify({
        record: animal.record,
        id: animal.idAnimal,
        breed: animal.breed?.name || 'N/A',
        status: animal.status
      });

      try {
        const qrDataUrl = await QRCode.toDataURL(qrData, { width: 128 });
        return `
          <div class="flex flex-col items-center m-2">
            <img src="${qrDataUrl}" alt="QR Code for ${animal.record}" width="128" height="128" />
            <span class="mt-2 text-sm">${animal.record} - ${animal.breed?.name || 'N/A'}</span>
          </div>
        `;
      } catch (error) {
        console.error('Error generating QR code:', error);
        return '';
      }
    });

    const qrCodesArray = await Promise.all(qrPromises);
    setQrCodesHTML(qrCodesArray.join(''));
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Codes de Animales</title>
            <style>
              body { display: flex; flex-wrap: wrap; justify-content: center; }
              .qr-code { margin: 10px; text-align: center; }
            </style>
          </head>
          <body>
            ${qrCodesHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Generar Códigos QR de Animales</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div 
            className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[60vh]"
            dangerouslySetInnerHTML={{ __html: qrCodesHTML }}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handlePrint}>Imprimir Códigos QR</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};