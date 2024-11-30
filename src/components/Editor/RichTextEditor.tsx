import React, { useMemo, useCallback, useState } from 'react';
import { createEditor, Descendant, BaseEditor } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import { Toolbar } from './Toolbar';
import { Element } from './Elements';
import { Leaf } from './Leaf';
import { ReactEditor } from 'slate-react';

type CustomEditor = BaseEditor & ReactEditor & {
  marks?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
  };
}

type MarkFormat = 'bold' | 'italic' | 'underline' | 'code';

const HOTKEYS: Record<string, MarkFormat> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())) as CustomEditor, []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [isFirstFocus, setIsFirstFocus] = useState(true);

  const handleFocus = useCallback(() => {
    if (isFirstFocus) {
      setValue([
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ]);
      setIsFirstFocus(false);
    }
  }, [isFirstFocus]);

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  const handleHotkeys = (event: React.KeyboardEvent) => {
    for (const [hotkey, mark] of Object.entries(HOTKEYS)) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const isActive = editor.marks?.[mark];
        if (isActive) {
          editor.removeMark(mark);
        } else {
          editor.addMark(mark, true);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <Slate editor={editor} initialValue={value} onChange={setValue}>
          <Toolbar />
          <div className="p-4">
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="Start typing..."
              spellCheck
              onKeyDown={handleHotkeys}
              onFocus={handleFocus}
              className="min-h-[500px] focus:outline-none"
            />
          </div>
        </Slate>
      </div>
    </div>
  );
};