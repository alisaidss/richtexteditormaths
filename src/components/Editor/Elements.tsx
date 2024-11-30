import { RenderElementProps } from 'slate-react';
import 'katex/dist/katex.min.css';
import InlineMath from '@matejmazur/react-katex';

export const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'heading-one':
      return <h1 {...attributes} className="text-2xl font-bold my-4">{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes} className="text-xl font-bold my-3">{children}</h2>;
    case 'block-quote':
      return <blockquote {...attributes} className="border-l-4 border-gray-300 pl-4 my-4 italic">{children}</blockquote>;
    case 'audio':
      return (
        <div {...attributes}>
          <div contentEditable={false} className="my-4">
            <audio controls className="w-full">
              <source src={element.url} />
              Your browser does not support the audio element.
            </audio>
          </div>
          {children}
        </div>
      );
    case 'video':
      return (
        <div {...attributes}>
          <div contentEditable={false} className="my-4">
            <video controls className="w-full max-h-[400px]">
              <source src={element.url} />
              Your browser does not support the video element.
            </video>
          </div>
          {children}
        </div>
      );
    case 'math':
      return (
        <span {...attributes} contentEditable>
          {children}
          <span
            contentEditable={false}
            className="inline-block select-all px-1"
          >
            <InlineMath 
              math={element.mathText || ''} 
            />
          </span>
        </span>
      );
    case 'paragraph':
      return (
        <p 
          {...attributes} 
          className={`my-2 ${
            element.align === 'center' ? 'text-center' : 
            element.align === 'right' ? 'text-right' : 
            'text-left'
          }`}
        >
          {children}
        </p>
      );
    case 'numbered-list':
      return <ol {...attributes} className="list-decimal pl-5 my-2">{children}</ol>;
    case 'bulleted-list':
      return <ul {...attributes} className="list-disc pl-5 my-2">{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes} className="my-2">{children}</p>;
  }
};