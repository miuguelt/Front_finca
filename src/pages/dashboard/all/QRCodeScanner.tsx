import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = (result: any) => {
    if (result) {
      try {
        const scannedData = JSON.parse(result?.text);
        if (scannedData?.record) {
          onScan(scannedData.record || '');
          setScanning(false);
          onClose();
        } else {
          setError('QR code content is invalid');
        }
      } catch (error) {
        setError('QR code format is invalid');
      }
    }
  };  

  const handleAnalyze = () => {
    setScanning(true);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escanear Código QR</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="relative">
            {isOpen && (
              <QrReader
                onResult={scanning ? handleScan : undefined}
                constraints={{ facingMode: 'environment' }}
                videoId="qr-video"
                scanDelay={500}
              />
            )}
            {!scanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Button onClick={handleAnalyze}>Analizar QR</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};