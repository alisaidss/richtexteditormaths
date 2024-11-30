import React, { useRef, useState, useEffect } from 'react';
import MathKeyboardRef  from 'react-math-keyboard';
import MathInput from "react-math-keyboard";


interface MathInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mathText: string) => void;
}

export const MathInputModal: React.FC<MathInputModalProps> = ({ isOpen, onClose, onSubmit }) => {
 // const [latex, setLatex] = useState('');
  const firstMathfieldRef = useRef<MathKeyboardRef>(null);
  const [value1, setValue1] = useState("");
  
const clear = () => {
    if (firstMathfieldRef.current) {
        firstMathfieldRef.current.latex("");
    }
};
  
  useEffect(() => {
    if (isOpen && firstMathfieldRef.current) {
      firstMathfieldRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg w-[600px] relative z-50" onClick={e => e.stopPropagation()}>
        <div>
          <div>
            <p style={{ fontSize: "2rem" }}>
              Input with all the keyboard keys :
            </p>
            <MathInput
              setValue={setValue1}
              setMathfieldRef={(mathfield: MathKeyboardRef) =>
                (firstMathfieldRef.current = mathfield)
              }
              divisionFormat="obelus"
              containerProps={{ style: { zIndex: 1000 } }}
            />
            <button onClick={() => clear()}>Clear</button>
            <p>Latex produced : {value1}</p>
          </div>

         
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button 
            onClick={() => {
              onSubmit(value1);
              onClose();
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