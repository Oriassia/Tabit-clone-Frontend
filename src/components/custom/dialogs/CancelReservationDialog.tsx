import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IRestaurantReservation } from "@/types/restaurant";
import { CiWarning } from "react-icons/ci";

interface CancelOrderDialogProps {
  reservationInfo: IRestaurantReservation | undefined;
  cancelReservation: (id: number) => void;
}

function CancelReservationDialog({
  reservationInfo,
  cancelReservation,
}: CancelOrderDialogProps) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="font-sans bg-black border border-opacity-60 border-greenButton hover:bg-gray-800 text-white font-bold py-3 px-2 rounded-md transition duration-150">
          Cancel Reservation
        </AlertDialogTrigger>
        <AlertDialogContent className=" text-center p-10 flex flex-col items-center w-auto max-w-96 rounded-xl dark:bg-greySelectedRestaurant gap-5">
          <AlertDialogHeader className=" items-center text-white">
            <CiWarning size={120} className="text-greenButton" />
            <AlertDialogTitle className="text-2xl text-center">
              Reservation <br /> Cancellation
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="dark:text-white">
            Are you sure you wish to cancel the reservation?
          </div>

          <AlertDialogFooter className="w-full">
            <div className="flex flex-col w-full gap-3 items-center">
              <div className="dark:bg-white py-2 w-full text-center rounded-full ">
                <AlertDialogAction
                  className="text-black text-xl dark:bg-white "
                  onClick={() =>
                    cancelReservation(
                      reservationInfo?.reservationId
                        ? reservationInfo.reservationId
                        : -1
                    )
                  }
                >
                  Cancel Reservation
                </AlertDialogAction>
              </div>{" "}
              <div>
                <AlertDialogCancel className="text-greenButton text-xl border-none underline">
                  Back
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CancelReservationDialog;
