// Define an interface for the ActionButton props for TypeScript
interface ActionButtonProps {
  icon: JSX.Element;
  text: string;
}

const ActionButton = ({ icon, text }: ActionButtonProps) => {
  return (
    <button className="font-rubik flex flex-col h-[90px] w-24 border-2 border-opacity-85 border-greenReservationActive items-center justify-center bg-none hover:bg-gray-800 text-white rounded-lg transition duration-150">
      <div className="text-xl text-greenReservationActive">{icon}</div>
      <span className="text-md">{text}</span>
    </button>
  );
};

export default ActionButton;
