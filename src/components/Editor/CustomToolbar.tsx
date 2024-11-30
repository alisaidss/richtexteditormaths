import {
  Bold, Italic, Underline, List, Code,
  Image, Video, 
  AlignLeft, AlignCenter, AlignRight,
  Subscript, Superscript, FunctionSquare
} from 'lucide-react';

export const CustomToolbar = () => {
  return (
    <div id="toolbar" className="border-b border-gray-200">
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold">
          <Bold size={18} />
        </button>
        <button className="ql-italic">
          <Italic size={18} />
        </button>
        <button className="ql-underline">
          <Underline size={18} />
        </button>
        <button className="ql-code-block">
          <Code size={18} />
        </button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered">
          <List size={18} />
        </button>
        <button className="ql-list" value="bullet">
          <List size={18} />
        </button>
      </span>
      <span className="ql-formats">
        <button className="ql-align" value="">
          <AlignLeft size={18} />
        </button>
        <button className="ql-align" value="center">
          <AlignCenter size={18} />
        </button>
        <button className="ql-align" value="right">
          <AlignRight size={18} />
        </button>
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub">
          <Subscript size={18} />
        </button>
        <button className="ql-script" value="super">
          <Superscript size={18} />
        </button>
      </span>
      <span className="ql-formats">
        <button className="ql-image">
          <Image size={18} />
        </button>
        <button className="ql-video">
          <Video size={18} />
        </button>
        <button className="ql-formula">
          <FunctionSquare size={18} />
        </button>
      </span>
    </div>
  );
};