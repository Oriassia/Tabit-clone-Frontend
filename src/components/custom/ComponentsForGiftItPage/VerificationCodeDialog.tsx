import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"; // Update with the correct path for your project
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have Input in your components
import { X } from "lucide-react"; // Assuming you're using lucide-react icons

interface VerificationCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
  inputCode: string;
  setInputCode: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
  handleCodeVerification: () => void;
  handleResendCode: () => void;
}

const VerificationCodeDialog: React.FC<VerificationCodeDialogProps> = ({
  isOpen,
  onClose,
  phone,
  inputCode,
  setInputCode,
  errorMessage,
  handleCodeVerification,
  handleResendCode,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" dark:text-white w-[13em] text-xl pt-4 dark:bg-greyHoverDropDownMenu rounded-md border-none">
        <DialogHeader>
          <DialogClose className="absolute right-4 top-4 bg-transparent rounded-full p-0.5">
            <X size={18} />
          </DialogClose>
          <DialogTitle className="text-center text-[1.25rem] font-normal mb-2">
            We have sent a verification code to {phone}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Verification code *"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className=" text-white dark:bg-transparent border-b border-greyBorder p-2 rounded-none placeholder:font-bold placeholder:text-base"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <DialogFooter
          style={{ display: "flex", flexDirection: "column" }}
          className="items-center justify-center"
        >
          <Button
            onClick={handleCodeVerification}
            disabled={inputCode.trim() === ""}
            className={`dark:bg-greyDarkBg w-[9em] dark:text-white rounded-3xl py-2 text-lg ${
              inputCode.trim()
                ? "cursor-pointer dark:bg-[#006666]"
                : "opacity-50 cursor-not-allowed"
            } block`}
          >
            Continue
          </Button>
          <Button
            variant="ghost"
            onClick={handleResendCode}
            className=" text-gray-400 dark:hover:bg-transparent text-sm hover:text-gray-500 block"
          >
            Resend Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationCodeDialog;
