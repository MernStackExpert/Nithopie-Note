import { useEffect, useState } from "react";
import { 
  Bold, Italic, Underline as UnderlineIcon, Image as ImageIcon, 
  AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Baseline
} from "lucide-react";

export default function FormattingToolbar({ editor, setIsImageModalOpen }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!editor) return;
    const forceUpdate = () => setTick(prev => prev + 1);
    editor.on('transaction', forceUpdate);
    return () => {
      editor.off('transaction', forceUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  const activeClass = "bg-blue-600 text-white shadow-md transform scale-105";
  const inactiveClass = "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <div className="px-4 md:px-8 py-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-[#0D1117]/50 flex items-center gap-2 overflow-x-auto custom-scrollbar">
      
      <button 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive('bold') ? activeClass : inactiveClass}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      
      <button 
        onClick={() => editor.chain().focus().toggleItalic().run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive('italic') ? activeClass : inactiveClass}`}
      >
        <Italic className="w-4 h-4" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleUnderline().run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive('underline') ? activeClass : inactiveClass}`}
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <button 
        onClick={() => editor.chain().focus().toggleBulletList().run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive('bulletList') ? activeClass : inactiveClass}`}
      >
        <List className="w-4 h-4" />
      </button>

      <button 
        onClick={() => editor.chain().focus().toggleOrderedList().run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive('orderedList') ? activeClass : inactiveClass}`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <div className={`relative flex items-center gap-1 p-1 rounded-lg transition-all duration-200 ${editor.isActive('textStyle') ? 'bg-gray-200 dark:bg-gray-800' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
        <Baseline className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <input
          type="color"
          onInput={event => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-6 h-6 p-0 border-0 rounded cursor-pointer bg-transparent"
        />
      </div>

      <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <button 
        onClick={() => editor.chain().focus().setTextAlign('left').run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive({ textAlign: 'left' }) ? activeClass : inactiveClass}`}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      
      <button 
        onClick={() => editor.chain().focus().setTextAlign('center').run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive({ textAlign: 'center' }) ? activeClass : inactiveClass}`}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      
      <button 
        onClick={() => editor.chain().focus().setTextAlign('right').run()} 
        className={`p-2 rounded-lg transition-all duration-200 ${editor.isActive({ textAlign: 'right' }) ? activeClass : inactiveClass}`}
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></div>

      <button 
        onClick={() => setIsImageModalOpen(true)} 
        className={`p-2 rounded-lg transition-all duration-200 ${inactiveClass}`}
      >
        <ImageIcon className="w-4 h-4" />
      </button>

    </div>
  );
}