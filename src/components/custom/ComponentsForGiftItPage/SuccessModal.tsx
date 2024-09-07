import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf"; // Import jsPDF

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const qrCodeRef = useRef<HTMLDivElement>(null); // Reference to the QR code element

  const handleClose = () => {
    onClose(); // Close the modal
    navigate("/gift-it"); // Navigate to the "/gift-it" route
  };

  const saveAsPDF = () => {
    const doc = new jsPDF();
    const qrCanvas = qrCodeRef.current?.querySelector("canvas");

    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL("image/png");
      doc.text("Your QR Code", 20, 20);
      doc.addImage(qrImage, "PNG", 20, 30, 128, 128); // Add the QR code image to the PDF
      doc.save("QRCode.pdf"); // Save the PDF with the QR code
      navigate("/gift-it");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:text-white w-[20em] text-xl pt-4 dark:bg-greyHoverDropDownMenu rounded-md border-none text-center">
        <DialogHeader>
          <DialogTitle className="text-[1.25rem] text-center font-normal mb-2">
            Payment Successful!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mb-4">
          <p>Your payment has been processed successfully.</p>
          {/* QR Code */}
          <div className="mt-4 flex flex-col text-center justify-center">
            <h2 className="text-lg mb-2">Your QR Code</h2>
            <div ref={qrCodeRef} className="self-center">
              <QRCodeCanvas
                value="https://your-website.com/gift-it" // This is the URL you want encoded in the QR code
                size={128} // Adjust the size of the QR code
                fgColor="#000000" // Foreground color of the QR code
                bgColor="#ffffff" // Background color of the QR code
                level={"H"}
                className="self-center"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-4">
          <Button
            onClick={saveAsPDF} // Call the save as PDF function
            className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm"
          >
            Save as PDF
          </Button>
          <Button
            onClick={handleClose}
            className="w-full bg-green-500 text-white rounded-lg py-2 text-sm"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
