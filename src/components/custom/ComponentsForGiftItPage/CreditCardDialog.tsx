import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuccessModal from "./SuccessModal"; // Import the success modal
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { X } from "lucide-react";

interface CreditCardDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditCardDialog: React.FC<CreditCardDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // New success modal state
  const navigate = useNavigate(); // Initialize navigate

  const [errors, setErrors] = useState({
    cardNumber: "",
    fullName: "",
    id: "",
    cvv: "",
    expirationDate: "",
  });

  const validateInputs = () => {
    let hasErrors = false;
    const errorsCopy = { ...errors };

    // Card Number Validation: Only digits and length of 16
    if (!/^\d{16}$/.test(cardNumber)) {
      errorsCopy.cardNumber = "Invalid card number. Must be 16 digits.";
      hasErrors = true;
    } else {
      errorsCopy.cardNumber = "";
    }

    // Full Name Validation: Only letters and spaces allowed
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      errorsCopy.fullName = "Invalid name. Only letters and spaces allowed.";
      hasErrors = true;
    } else {
      errorsCopy.fullName = "";
    }

    // ID Validation: Only 9 digits allowed
    if (!/^\d{9}$/.test(id)) {
      errorsCopy.id = "Invalid ID. Must be 9 digits.";
      hasErrors = true;
    } else {
      errorsCopy.id = "";
    }

    // CVV Validation: Only 3 digits allowed
    if (!/^\d{3}$/.test(cvv)) {
      errorsCopy.cvv = "Invalid CVV. Must be 3 digits.";
      hasErrors = true;
    } else {
      errorsCopy.cvv = "";
    }

    // Expiration Date Validation: MM/YY format
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
      errorsCopy.expirationDate = "Invalid expiration date. Format: MM/YY.";
      hasErrors = true;
    } else {
      errorsCopy.expirationDate = "";
    }

    setErrors(errorsCopy);
    return !hasErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInputs()) {
      // Close the credit card modal
      onClose();

      // Open the success modal
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="dark:text-white w-[20em] text-xl pt-4 dark:bg-greyHoverDropDownMenu rounded-md border-none text-center">
          <DialogHeader>
            <DialogClose className="absolute right-4 top-4 bg-transparent rounded-full p-0.5">
              <X size={18} />
            </DialogClose>
            <DialogTitle className="text-[1.25rem] font-normal mb-2">
              Enter Credit Card Details
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Card Number */}
            <Input
              type="text"
              placeholder="Card Number (16 digits)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className=" text-white dark:bg-transparent border-b border-greyBorder p-2 rounded-none"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}

            {/* Full Name */}
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className=" text-white dark:bg-transparent border-b border-greyBorder p-2 rounded-none"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}

            {/* ID */}
            <Input
              type="text"
              placeholder="ID (9 digits)"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className=" text-white dark:bg-transparent border-b border-greyBorder p-2 rounded-none"
            />
            {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}

            {/* CVV */}
            <Input
              type="text"
              placeholder="CVV (3 digits)"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className=" text-white dark:bg-transparent border-b border-greyBorder p-2 rounded-none"
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

            {/* Expiration Date */}
            <Input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className=" text-white dark:bg-transparent border-b border-greyBorder p-2 rounded-none"
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm">{errors.expirationDate}</p>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-green-500 text-white rounded-lg py-2 text-sm"
              >
                Submit Payment
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};

export default CreditCardDialog;
