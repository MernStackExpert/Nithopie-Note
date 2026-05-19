"use client";

import { useState, useEffect, use } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Download, X } from "lucide-react";
import toast from "react-hot-toast";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';

import LockScreen from "../components/LockScreen";
import EditorNavbar from "../components/EditorNavbar";
import FormattingToolbar from "../components/FormattingToolbar";
import SettingsModal from "../components/SettingsModal";
import InfoModal from "../components/InfoModal";
import ImageModal from "../components/ImageModal";
import { useNoteData } from "../hooks/useNoteData";

export default function NoteEditor({ params }) {
  const { id } = use(params);
  const { states, setters, actions } = useNoteData(id);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'note-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your thoughts...',
      }),
    ],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setters.setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[50vh] text-gray-700 dark:text-gray-300 font-medium text-lg leading-relaxed',
      },
      handleClickOn: (view, pos, node, nodePos, event, direct) => {
        if (node.type.name === 'image') {
          setPreviewImage(node.attrs.src);
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && !states.isLoading) {
      if (states.content && editor.isEmpty) {
        editor.commands.setContent(states.content);
      }
    }
  }, [states.isLoading, states.content, editor]);

  const handleInsertImage = (url) => {
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `notebook-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  if (states.isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-[#06090E]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (states.isLocked) {
    return <LockScreen handleUnlock={actions.handleUnlock} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#06090E] p-2 md:p-6">
      
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .ProseMirror img.note-image {
          max-width: 300px;
          max-height: 300px;
          object-fit: cover;
          border-radius: 1rem;
          cursor: zoom-in;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
        }
        .ProseMirror img.note-image:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .ProseMirror p {
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="flex-1 flex flex-col w-full bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/5 relative z-10">
        
        <EditorNavbar 
          syncStatus={states.syncStatus}
          isSaving={states.isSaving}
          handleSave={actions.handleSave}
          handleDelete={actions.handleDelete}
          setIsInfoOpen={setIsInfoOpen}
          setIsSettingsOpen={setIsSettingsOpen}
        />

        <FormattingToolbar 
          editor={editor} 
          setIsImageModalOpen={setIsImageModalOpen} 
        />

        <div className="flex-1 flex flex-col p-6 md:p-12 overflow-y-auto custom-scrollbar">
          <input 
            type="text" 
            value={states.title} 
            onChange={(e) => setters.setTitle(e.target.value)} 
            placeholder="Note Title..." 
            className="w-full text-4xl md:text-6xl font-black bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-200 dark:placeholder:text-gray-800 mb-8" 
          />
          
          <EditorContent editor={editor} className="flex-1" />
        </div>
      </div>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal 
            setIsSettingsOpen={setIsSettingsOpen}
            tags={states.tags} setTags={setters.setTags}
            isPrivate={states.isPrivate} setIsPrivate={setters.setIsPrivate}
            password={states.password} setPassword={setters.setPassword}
            id={id}
          />
        )}
        {isInfoOpen && <InfoModal setIsInfoOpen={setIsInfoOpen} />}
        {isImageModalOpen && (
          <ImageModal 
            isOpen={isImageModalOpen} 
            onClose={() => setIsImageModalOpen(false)} 
            onInsertImage={handleInsertImage} 
          />
        )}
        
        {previewImage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <button 
              onClick={() => setPreviewImage(null)} 
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors z-[10000]"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="relative max-w-5xl max-h-[80vh] z-[9999]"
            >
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-contain rounded-xl shadow-2xl" 
              />
              <button 
                onClick={handleDownloadImage}
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all active:scale-95"
              >
                <Download className="w-5 h-5" /> Download Full Image
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}