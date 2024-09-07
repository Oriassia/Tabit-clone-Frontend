import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"; // Update the imports based on your project structure
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Assuming you're using lucide-react icons

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="dark:text-white w-[15em] text-xl pt-4 dark:bg-greyHoverDropDownMenu rounded-md border-none text-center">
        <DialogClose className="absolute right-4 top-4 bg-transparent rounded-full p-0.5">
          <X size={18} />
        </DialogClose>
        <div className="mb-4">
          <div className="text-4xl text-green-500 mb-4">
            {/* Add an appropriate icon for the error */}
            <span>⚠️</span>
          </div>
          <h2 className="text-2xl font-bold">Something's Wrong</h2>
          <p className="text-base mt-2">
            The code appears to be incorrect or expired. Please try again.
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-green-500 text-white rounded-lg py-2 text-sm"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
