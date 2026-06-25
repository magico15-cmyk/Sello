"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

export default function RichTextEditor({ 
  value, 
  onChange, 
  align,
  color,
  id
}: { 
  value: string, 
  onChange: (val: string) => void, 
  align: any,
  color: string,
  id: string
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [hexColor, setHexColor] = useState('');
  const [formatOpen, setFormatOpen] = useState(false);
  const [blockFormatOpen, setBlockFormatOpen] = useState(false);
  const formatRef = useRef<HTMLDivElement>(null);
  const blockFormatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const saved = localStorage.getItem(`sello_rich_text_color_${id}`);
    if (saved) {
      setHexColor(saved);
    }
  }, [id]);

  const updateColor = (newColor: string) => {
    setHexColor(newColor);
    if (id) {
      localStorage.setItem(`sello_rich_text_color_${id}`, newColor);
    }
  };

  // Initialize value only once to avoid cursor jumping
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Close format dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formatRef.current && !formatRef.current.contains(e.target as Node)) {
        setFormatOpen(false);
      }
      if (blockFormatRef.current && !blockFormatRef.current.contains(e.target as Node)) {
        setBlockFormatOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save selection into a ref so toolbar can restore it
  const savedRangeRef = useRef<Range | null>(null);

  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (savedRangeRef.current && sel && editorRef.current) {
      editorRef.current.focus();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  }, []);

  /** Prevent default on mouseDown so the editor never loses focus */
  const preventFocusLoss = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const execFormat = (command: string, cmdValue?: string) => {
    // Selection is still active in the editor because we prevented default on mousedown
    document.execCommand(command, false, cmdValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleApplyColor = () => {
    let finalColor = hexColor.trim();
    if (!finalColor) return;
    if (!finalColor.startsWith('#')) {
      finalColor = '#' + finalColor;
    }

    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('foreColor', false, finalColor);
    
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  /**
   * Intercept Backspace/Delete: snapshot styled elements before the key,
   * then after the browser processes it, unwrap any that GREW (absorbed merged content).
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Backspace' && e.key !== 'Delete') return;
    if (!editorRef.current) return;

    // Snapshot text lengths of all inline styling elements
    const inlineSnapshot = new Map<Element, number>();
    editorRef.current.querySelectorAll('strong, b, em, i, u, font, span[style]').forEach(el => {
      inlineSnapshot.set(el, (el.textContent || '').length);
    });

    // Snapshot text lengths of block styling elements
    const blockSnapshot = new Map<Element, number>();
    editorRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, blockquote').forEach(el => {
      blockSnapshot.set(el, (el.textContent || '').length);
    });

    // After browser processes the keystroke
    requestAnimationFrame(() => {
      if (!editorRef.current) return;
      let changed = false;

      // Check inline elements that grew (absorbed merged content)
      inlineSnapshot.forEach((oldLen, el) => {
        const newLen = (el.textContent || '').length;
        if (el.parentNode && newLen > oldLen) {
          // This element absorbed text from the next line — unwrap it
          const parent = el.parentNode;
          while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
          }
          el.remove();
          changed = true;
        }
      });

      // Check block elements that grew (heading absorbed paragraph content)
      blockSnapshot.forEach((oldLen, el) => {
        const newLen = (el.textContent || '').length;
        if (el.parentNode && newLen > oldLen) {
          // Convert to <p>
          const p = document.createElement('p');
          while (el.firstChild) {
            p.appendChild(el.firstChild);
          }
          el.parentNode.replaceChild(p, el);
          changed = true;
        }
      });

      if (changed) {
        onChange(editorRef.current.innerHTML);
      }
    });
  }, [onChange]);

  /** Remove empty inline styling tags left behind after text deletion */
  const cleanupEmptyStyles = useCallback(() => {
    if (!editorRef.current) return;
    
    const sel = window.getSelection();
    let cursorNode: Node | null = null;
    let cursorOffset = 0;
    if (sel && sel.rangeCount > 0) {
      cursorNode = sel.getRangeAt(0).startContainer;
      cursorOffset = sel.getRangeAt(0).startOffset;
    }

    const emptyTags = editorRef.current.querySelectorAll(
      'strong, b, em, i, u, span, font, strike, s, sub, sup, h1, h2, h3, h4, h5, h6, blockquote'
    );
    let changed = false;
    
    emptyTags.forEach(el => {
      const text = el.textContent || '';
      const hasOnlyBr = el.children.length === 1 && el.children[0].tagName === 'BR';
      const isEmpty = text.trim() === '' && (el.children.length === 0 || hasOnlyBr);
      
      if (isEmpty) {
        const isCursorInside = cursorNode && el.contains(cursorNode);
        
        if (['H1','H2','H3','H4','H5','H6', 'BLOCKQUOTE'].includes(el.tagName)) {
           // Convert empty heading/quote to paragraph to break out of the style
           const p = document.createElement('p');
           p.innerHTML = '<br>';
           el.parentNode?.replaceChild(p, el);
           if (isCursorInside && sel) {
              const range = document.createRange();
              range.setStart(p, 0);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
           }
           changed = true;
        } else {
           // Remove empty inline tags
           const parent = el.parentNode;
           if (hasOnlyBr) {
              parent?.insertBefore(document.createElement('br'), el);
           }
           if (isCursorInside && sel && parent) {
              const range = document.createRange();
              const index = Array.from(parent.childNodes).indexOf(el as ChildNode);
              if (index >= 0) {
                 range.setStart(parent, index);
                 range.collapse(true);
                 sel.removeAllRanges();
                 sel.addRange(range);
              }
           }
           el.remove();
           
           // Ensure parent isn't left completely empty without a cursor target
           if (parent && parent.childNodes.length === 0 && parent.nodeName === 'P') {
              parent.appendChild(document.createElement('br'));
           }
           changed = true;
        }
      }
    });

    if (changed && editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-4 mb-2 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
          {/* Block format dropdown (Paragraph, H1, H2, etc) */}
          <div className="relative" ref={blockFormatRef}>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setBlockFormatOpen(prev => !prev);
                setFormatOpen(false);
              }}
              className="h-8 px-2 border border-gray-200 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none mr-2 flex items-center gap-1"
            >
              Format ▾
            </button>
            {blockFormatOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px] py-1">
                {[
                  { label: 'Normal Text', value: 'p' },
                  { label: 'Heading 1', value: 'h1' },
                  { label: 'Heading 2', value: 'h2' },
                  { label: 'Heading 3', value: 'h3' },
                  { label: 'Quote', value: 'blockquote' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execFormat('formatBlock', `<${opt.value}>`);
                      setBlockFormatOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Font size dropdown — all mousedowns preventDefault to keep editor focused */}
          <div className="relative" ref={formatRef}>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setFormatOpen(prev => !prev);
                setBlockFormatOpen(false);
              }}
              className="h-8 px-2 border border-gray-200 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none mr-2 flex items-center gap-1"
            >
              Font Size ▾
            </button>
            {formatOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px] py-1">
                {[
                  { label: '12px', size: '1' },
                  { label: '14px', size: '2' },
                  { label: '16px', size: '3' },
                  { label: '18px', size: '4' },
                  { label: '20px', size: '5' },
                  { label: '24px', size: '6' },
                  { label: '36px', size: '7' },
                ].map(opt => (
                  <button
                    key={opt.size}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execFormat('fontSize', opt.size);
                      setFormatOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('bold')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-700 font-bold transition-colors"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('italic')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-700 italic font-serif transition-colors"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('underline')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-700 underline transition-colors"
            title="Underline"
          >
            U
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('removeFormat')}
            className="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm font-medium transition-colors ml-1"
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>

        {/* Alignment buttons */}
        <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('justifyLeft')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
            title="Align Left"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="2" rx="0.5"/><rect x="1" y="6" width="10" height="2" rx="0.5"/><rect x="1" y="10" width="14" height="2" rx="0.5"/><rect x="1" y="14" width="8" height="2" rx="0.5" transform="translate(0 -2)"/></svg>
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('justifyCenter')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
            title="Align Center"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="2" rx="0.5"/><rect x="3" y="6" width="10" height="2" rx="0.5"/><rect x="1" y="10" width="14" height="2" rx="0.5"/><rect x="4" y="14" width="8" height="2" rx="0.5" transform="translate(0 -2)"/></svg>
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => execFormat('justifyRight')}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 transition-colors"
            title="Align Right"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="14" height="2" rx="0.5"/><rect x="5" y="6" width="10" height="2" rx="0.5"/><rect x="1" y="10" width="14" height="2" rx="0.5"/><rect x="7" y="14" width="8" height="2" rx="0.5" transform="translate(0 -2)"/></svg>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-gray-500">Color:</label>
          <div className="flex items-center gap-2">
            <input 
              type="color" 
              value={hexColor.startsWith('#') ? hexColor : (hexColor ? `#${hexColor}` : '#000000')}
              onMouseDown={() => saveSelection()}
              onChange={(e) => {
                updateColor(e.target.value);
                const clr = e.target.value;
                restoreSelection();
                document.execCommand('styleWithCSS', false, 'true');
                document.execCommand('foreColor', false, clr);
                if (editorRef.current) {
                  onChange(editorRef.current.innerHTML);
                }
              }}
              className="w-7 h-7 rounded cursor-pointer border border-gray-200 p-0 shadow-sm"
              title="Pick a color from palette"
            />
            <div className="flex items-center">
              <span className="text-gray-400 text-sm border border-r-0 border-gray-300 rounded-l-lg px-2 py-1 bg-gray-50">#</span>
              <input 
                type="text" 
                value={hexColor.replace('#', '')}
                onChange={(e) => updateColor(e.target.value)}
                placeholder="FE7F2D"
                maxLength={6}
                className="w-20 px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-sm"
              />
              <button 
                onClick={handleApplyColor}
                className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-r-lg transition-colors border border-brand-600 hover:border-brand-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onKeyDown={handleKeyDown}
        onSelect={saveSelection}
        onBlur={(e) => {
          saveSelection();
          cleanupEmptyStyles();
          onChange(e.currentTarget.innerHTML);
        }}
        onInput={(e) => {
          cleanupEmptyStyles();
          onChange(e.currentTarget.innerHTML);
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors min-h-[200px] whitespace-pre-wrap"
        style={{ textAlign: align, color: color }}
      />
    </div>
  );
}
