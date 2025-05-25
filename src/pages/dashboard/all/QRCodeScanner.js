import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export const QRCodeScanner = ({ isOpen, onClose, onScan }) => {
    const [error, setError] = useState(null);
    const [scanning, setScanning] = useState(false);
    const handleScan = (result) => {
        if (result) {
            try {
                const scannedData = JSON.parse(result?.text);
                if (scannedData?.record) {
                    onScan(scannedData.record || '');
                    setScanning(false);
                    onClose();
                }
                else {
                    setError('QR code content is invalid');
                }
            }
            catch (error) {
                setError('QR code format is invalid');
            }
        }
    };
    const handleAnalyze = () => {
        setScanning(true);
        setError(null);
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Escanear C\u00F3digo QR" }) }), _jsxs("div", { className: "mt-4", children: [error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error" }), _jsx(AlertDescription, { children: error })] })), _jsxs("div", { className: "relative", children: [isOpen && (_jsx(QrReader, { onResult: scanning ? handleScan : undefined, constraints: { facingMode: 'environment' }, videoId: "qr-video", scanDelay: 500 })), !scanning && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50", children: _jsx(Button, { onClick: handleAnalyze, children: "Analizar QR" }) }))] })] })] }) }));
};
