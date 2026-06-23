"use client";

import React, { useRef, useEffect, useState } from 'react';

export default function RichTextEditor({ 
  value, 
  onChange, 
  align,
  color
}: { 
  value: string, 
  onChange: (val: string) => void, 
  align: any,
  color: string
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  // Initialize value only once to avoid cursor jumping
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedRange(sel.getRangeAt(0));
    }
  };

  const applyColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    const sel = window.getSelection();
    if (savedRange && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
    
    // Apply the color to the selected text
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('foreColor', false, color);
    
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
        <label className="text-xs font-medium text-gray-500">Color selected text:</label>
        <input 
          type="color" 
          onChange={applyColor}
          defaultValue="#000000"
          className="w-6 h-6 rounded cursor-pointer border-0 p-0"
          title="Highlight some text, then pick a color"
        />
        <span className="text-xs text-gray-400 italic">(Highlight text first)</span>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onSelect={saveSelection}
        onBlur={saveSelection}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors min-h-[100px] whitespace-pre-wrap"
        style={{ textAlign: align, color: color }}
      />
    </div>
  );
}
