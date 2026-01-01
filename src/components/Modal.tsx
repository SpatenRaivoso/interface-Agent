import React from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-4 flex flex-col max-h-[80vh] w-full max-w-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="text-sm text-red-500">
            Fechar
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}