import React, { useRef, useEffect, useState } from 'react';
import '//unpkg.com/mathlive';

interface MathFieldElement extends HTMLElement {
  value: string;
  smartFence: boolean;
  executeCommand: (command: string) => void;
}

interface MathLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mathText: string) => void;
}

export const MathLiveModal: React.FC<MathLiveModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [value, setValue] = useState('');
  const mf = useRef<MathFieldElement>(null);

  useEffect(() => {
    if (!mf.current) return;
    mf.current.smartFence = true;
    mf.current.value = value;
  }, [value, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg w-[600px] relative z-50" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Insert Math Expression (MathLive)</h2>
        <div className="mb-4">
          <math-field
            ref={mf}
            onInput={function(e: { target: MathFieldElement }) { setValue(e.target.value) }}
            className="w-full p-2 border rounded"
            role="textbox"
            aria-label="Math expression input"
            style={{ fontSize: '2rem', display: 'block' }}
          >
            {value}
          </math-field>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(value);
              onClose();
              setValue('');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}; 