import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';
import { CustomToolbar } from './CustomToolbar';
import { modules, formats } from './editorConfig';

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="h-[500px] overflow-y-auto"
      />
    </div>
  );
};