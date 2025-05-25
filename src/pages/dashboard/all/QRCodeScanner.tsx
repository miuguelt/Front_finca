import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
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
  const qrCodeRef = useRef<Html5Qrcode | null>(null);
  const qrBoxId = `qr-box-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (isOpen && scanning) {
      const html5QrCode = new Html5Qrcode(qrBoxId);
      qrCodeRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          try {
            const scannedData = JSON.parse(decodedText);
            if (scannedData?.record) {
              onScan(scannedData.record);
              stopScanner();
              onClose();
            } else {
              setError('QR code content is invalid');
            }
          } catch {
            setError('QR code format is invalid');
          }
        },
        (errorMessage) => {
          if (!errorMessage.includes("NotFoundException")) {
            setError(errorMessage);
          }
        }
      ).catch((err) => {
        setError("Failed to start scanner: " + err);
      });
    }

    return () => {
      stopScanner();
    };
  }, [isOpen, scanning]);

  const stopScanner = () => {
    if (qrCodeRef.current?.isScanning) {
      qrCodeRef.current.stop().then(() => {
        qrCodeRef.current?.clear();
      }).catch(console.error);
    }
    qrCodeRef.current = null;
  };

  const handleAnalyze = () => {
    setScanning(true);
    setError(null);
  };

  const handleCloseDialog = () => {
    stopScanner();
    onClose();
    setScanning(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
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
            <div id={qrBoxId} className="w-full h-64" />
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