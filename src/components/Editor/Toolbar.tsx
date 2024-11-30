import React, { useState } from 'react';
import { Editor, Transforms, BaseElement, Element as SlateElement } from 'slate';
import { useSlate } from 'slate-react';
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  Quote,
  Music,
  Video,
  FunctionSquare,
  Calculator,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  List,
  ListOrdered
} from 'lucide-react';
import { MathInputModal } from './MathInputModal';
import { MathLiveModal } from './MathLiveModal';

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean; };
type CustomElement = BaseElement & {
  type: 'paragraph' | 'heading-one' | 'heading-two' | 'block-quote' | 'audio' | 'video' | 'math' | 'image' | 'numbered-list' | 'bulleted-list' | 'list-item';
  children: CustomText[];
  url?: string;
  mathText?: string;
  align?: 'left' | 'center' | 'right';
};

type BlockFormat = 'paragraph' | 'heading-one' | 'heading-two' | 'block-quote' | 'audio' | 'video' | 'math' | 'image' | 'numbered-list' | 'bulleted-list' | 'list-item';
type MarkFormat = 'bold' | 'italic' | 'underline' | 'code';

const ToolbarButton = ({ isActive, onMouseDown, children }: {
  isActive: boolean;
  onMouseDown: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}) => (
  <button
    className={`p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`}
    onMouseDown={onMouseDown}
  >
    {children}
  </button>
);

export const Toolbar = () => {
  const editor = useSlate();
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [isMathLiveModalOpen, setIsMathLiveModalOpen] = useState(false);

  const toggleMark = (format: MarkFormat) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const toggleBlock = (format: BlockFormat) => {
    const isActive = isBlockActive(editor, format);
    const newProperties: Partial<CustomElement> = {
      type: isActive ? 'paragraph' : format,
    };
    Transforms.setNodes<CustomElement>(editor, newProperties);
  };

  const isMarkActive = (editor: Editor, format: MarkFormat) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const isBlockActive = (editor: Editor, format: BlockFormat) => {
    const [match] = Editor.nodes(editor, {
      match: n => (n as CustomElement).type === format,
    });
    return !!match;
  };

  const handleImageUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.insertNode({ 
        type: 'image', 
        url, 
        children: [{ text: '' }] 
      });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const color = e.target.value;
    Editor.addMark(editor, 'color', color);
  };

  const toggleAlign = (alignment: 'left' | 'center' | 'right') => {
    const isActive = isAlignActive(editor, alignment);
    Transforms.setNodes(
      editor,
      { align: isActive ? undefined : alignment },
      { match: n => SlateElement.isElement(n) && n.type === 'paragraph' }
    );
  };

  const isAlignActive = (editor: Editor, alignment: string) => {
    const [match] = Editor.nodes(editor, {
      match: n => SlateElement.isElement(n) && n.align === alignment,
    });
    return !!match;
  };

  const toggleList = (type: 'numbered-list' | 'bulleted-list') => {
    const isList = isBlockActive(editor, type);
    
    Transforms.unwrapNodes(editor, {
      match: n => 
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n.type === 'numbered-list' || n.type === 'bulleted-list'),
      split: true,
    });

    if (!isList) {
      const block = { type, children: [] };
      Transforms.wrapNodes(editor, block);
    }

    Transforms.setNodes(editor, {
      type: isList ? 'paragraph' : 'list-item',
    });
  };

  return (
    <div className="border-b p-2 flex gap-2 flex-wrap">
      <ToolbarButton
        isActive={isMarkActive(editor, 'bold')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('bold');
        }}
      >
        <Bold size={20} />
      </ToolbarButton>
      
      <ToolbarButton
        isActive={isMarkActive(editor, 'italic')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('italic');
        }}
      >
        <Italic size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isMarkActive(editor, 'underline')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('underline');
        }}
      >
        <Underline size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isMarkActive(editor, 'code')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('code');
        }}
      >
        <Code size={20} />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <ToolbarButton
        isActive={isBlockActive(editor, 'heading-one')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock('heading-one');
        }}
      >
        <Heading1 size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isBlockActive(editor, 'heading-two')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock('heading-two');
        }}
      >
        <Heading2 size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isBlockActive(editor, 'block-quote')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock('block-quote');
        }}
      >
        <Quote size={20} />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      <ToolbarButton
        isActive={isBlockActive(editor, 'audio')}
        onMouseDown={(e) => {
          e.preventDefault();
          const url = window.prompt('Enter audio URL:');
          if (url) {
            editor.insertNode({ type: 'audio', url, children: [{ text: '' }] });
          }
        }}
      >
        <Music size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isBlockActive(editor, 'video')}
        onMouseDown={(e) => {
          e.preventDefault();
          const url = window.prompt('Enter video URL:');
          if (url) {
            editor.insertNode({ type: 'video', url, children: [{ text: '' }] });
          }
        }}
      >
        <Video size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isBlockActive(editor, 'math')}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsMathModalOpen(true);
        }}
      >
        <FunctionSquare size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={false}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsMathLiveModalOpen(true);
        }}
      >
        <Calculator size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isAlignActive(editor, 'left')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign('left');
        }}
      >
        <AlignLeft size={20} />
      </ToolbarButton>
      
      <ToolbarButton
        isActive={isAlignActive(editor, 'center')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign('center');
        }}
      >
        <AlignCenter size={20} />
      </ToolbarButton>
      
      <ToolbarButton
        isActive={isAlignActive(editor, 'right')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign('right');
        }}
      >
        <AlignRight size={20} />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />
      
      <ToolbarButton
        isActive={false}
        onMouseDown={handleImageUpload}
      >
        <Image size={20} />
      </ToolbarButton>

      <div className="relative">
        <input
          type="color"
          onChange={handleColorChange}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
        <ToolbarButton isActive={false} onMouseDown={(e) => e.preventDefault()}>
          <Palette size={20} />
        </ToolbarButton>
      </div>

      <ToolbarButton
        isActive={isBlockActive(editor, 'numbered-list')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleList('numbered-list');
        }}
      >
        <ListOrdered size={20} />
      </ToolbarButton>

      <ToolbarButton
        isActive={isBlockActive(editor, 'bulleted-list')}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleList('bulleted-list');
        }}
      >
        <List size={20} />
      </ToolbarButton>

      <MathInputModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        onSubmit={(mathText) => {
          const node: CustomElement = {
            type: 'math',
            mathText,
            children: [{ text: '' }]
          };
          
          if (editor.selection) {
            const point = editor.selection.anchor;
            Transforms.insertNodes(editor, node, { 
              at: point,
              select: true
            });
          }
          setIsMathModalOpen(false);
        }}
      />

      <MathLiveModal
        isOpen={isMathLiveModalOpen}
        onClose={() => setIsMathLiveModalOpen(false)}
        onSubmit={(mathText) => {
          const mathNode: CustomElement = {
            type: 'math',
            mathText,
            children: [{ text: '' }]
          };
          
          if (editor.selection) {
            Transforms.insertNodes(editor, mathNode);
            // Insert text node after math
            Transforms.insertText(editor, ' ', { at: Editor.end(editor, []) });
            // Move cursor after space
            Transforms.select(editor, Editor.end(editor, []));
          }
          setIsMathLiveModalOpen(false);
        }}
      />
    </div>
  );
};