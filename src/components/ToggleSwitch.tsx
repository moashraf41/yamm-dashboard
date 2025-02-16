"use client";

interface Props {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch = ({ isOn, onToggle }: Props) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" className="hidden" checked={isOn} onChange={onToggle} />
      <div
        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
