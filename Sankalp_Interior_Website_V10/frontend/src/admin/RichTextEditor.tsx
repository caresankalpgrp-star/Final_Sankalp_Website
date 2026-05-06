import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEffect, useRef, useState } from 'react';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImageIcon, Undo2, Redo2, Eraser,
  AlignLeft, AlignCenter, AlignRight, Loader,
} from 'lucide-react';
import { apiUrl } from '../lib/api';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  /** Storage folder used for inline image uploads */
  uploadFolder?: string;
}

const COLORS = ['#0f2044', '#f07c1e', '#dc2626', '#16a34a', '#2563eb', '#7c3aed', '#374151', '#000000'];

export default function RichTextEditor({
  value, onChange, placeholder = 'Write your post…', uploadFolder = 'blog',
}: Props) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: 'text-orange-500 underline' } }),
      Image.configure({ inline: false, HTMLAttributes: { class: 'rounded-xl my-4 max-w-full' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[260px] px-4 py-3',
        'data-testid': 'rte-content',
      },
    },
  });

  // Keep editor in sync if `value` changes externally (e.g. when editing a different post)
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-400 border rounded-xl" style={{ borderColor: '#e0e0e8' }}>
        <Loader size={18} className="animate-spin" />
      </div>
    );
  }

  const setLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Enter URL (leave empty to remove)', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank', rel: 'noopener noreferrer' }).run();
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) { alert('Only image files allowed'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('Max 5 MB'); return; }
    setUploading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = reject;
        r.readAsDataURL(file);
      });
      const r = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, fileName: file.name, folder: uploadFolder }),
      });
      const data = await r.json();
      if (data?.url) {
        editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
      } else {
        alert(data?.detail || data?.error || 'Upload failed');
      }
    } catch (e: any) {
      alert(e?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const Btn = ({ active, onClick, title, children, testid }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      data-testid={testid}
      className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-gray-100"
      style={{
        background: active ? 'rgba(240,124,30,0.15)' : 'transparent',
        color: active ? '#d4640a' : '#444',
      }}
    >
      {children}
    </button>
  );

  return (
    <div
      className="rounded-xl overflow-hidden bg-white"
      style={{ border: '1px solid #e0e0e8' }}
      data-testid="rich-text-editor"
    >
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b sticky top-0 z-10 bg-white"
        style={{ borderColor: '#eef0f4' }}
      >
        <Btn title="Heading 1"  active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} testid="rte-h1"><Heading1 size={15} /></Btn>
        <Btn title="Heading 2"  active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} testid="rte-h2"><Heading2 size={15} /></Btn>
        <Btn title="Heading 3"  active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} testid="rte-h3"><Heading3 size={15} /></Btn>
        <span className="w-px h-5 bg-gray-200 mx-1" />

        <Btn title="Bold"        active={editor.isActive('bold')}        onClick={() => editor.chain().focus().toggleBold().run()} testid="rte-bold"><Bold size={15} /></Btn>
        <Btn title="Italic"      active={editor.isActive('italic')}      onClick={() => editor.chain().focus().toggleItalic().run()} testid="rte-italic"><Italic size={15} /></Btn>
        <Btn title="Underline"   active={editor.isActive('underline')}   onClick={() => editor.chain().focus().toggleUnderline().run()} testid="rte-underline"><UnderlineIcon size={15} /></Btn>
        <Btn title="Strike"      active={editor.isActive('strike')}      onClick={() => editor.chain().focus().toggleStrike().run()} testid="rte-strike"><Strikethrough size={15} /></Btn>
        <Btn title="Inline code" active={editor.isActive('code')}        onClick={() => editor.chain().focus().toggleCode().run()} testid="rte-code"><Code size={15} /></Btn>
        <span className="w-px h-5 bg-gray-200 mx-1" />

        <Btn title="Bullet list" active={editor.isActive('bulletList')}  onClick={() => editor.chain().focus().toggleBulletList().run()} testid="rte-ul"><List size={15} /></Btn>
        <Btn title="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} testid="rte-ol"><ListOrdered size={15} /></Btn>
        <Btn title="Blockquote"  active={editor.isActive('blockquote')}  onClick={() => editor.chain().focus().toggleBlockquote().run()} testid="rte-quote"><Quote size={15} /></Btn>
        <span className="w-px h-5 bg-gray-200 mx-1" />

        <Btn title="Align left"    active={editor.isActive({ textAlign: 'left' })}   onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={15} /></Btn>
        <Btn title="Align center"  active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={15} /></Btn>
        <Btn title="Align right"   active={editor.isActive({ textAlign: 'right' })}  onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={15} /></Btn>
        <span className="w-px h-5 bg-gray-200 mx-1" />

        <Btn title="Link"   active={editor.isActive('link')} onClick={setLink} testid="rte-link"><LinkIcon size={15} /></Btn>
        <Btn title={uploading ? 'Uploading…' : 'Insert image'} onClick={() => fileRef.current?.click()} testid="rte-image">
          {uploading ? <Loader size={15} className="animate-spin" /> : <ImageIcon size={15} />}
        </Btn>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
        />
        <span className="w-px h-5 bg-gray-200 mx-1" />

        {/* Color swatches */}
        {COLORS.map(c => (
          <button
            key={c}
            type="button"
            title={`Text colour ${c}`}
            onClick={() => editor.chain().focus().setColor(c).run()}
            className="w-5 h-5 rounded-full border border-gray-200 hover:scale-110 transition-transform"
            style={{ background: c }}
          />
        ))}
        <Btn title="Clear colour" onClick={() => editor.chain().focus().unsetColor().run()}><Eraser size={14} /></Btn>
        <span className="w-px h-5 bg-gray-200 mx-1" />

        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo2 size={15} /></Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo2 size={15} /></Btn>
      </div>

      {/* Editor surface */}
      <EditorContent editor={editor} />

      {/* Tiny prose CSS so headings/lists render with hierarchy */}
      <style>{`
        [data-testid="rte-content"] h1 { font-size: 1.5rem; font-weight: 800; margin: 1rem 0 .5rem; }
        [data-testid="rte-content"] h2 { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 .5rem; }
        [data-testid="rte-content"] h3 { font-size: 1.1rem; font-weight: 700; margin: .75rem 0 .25rem; }
        [data-testid="rte-content"] p  { margin: .5rem 0; line-height: 1.65; }
        [data-testid="rte-content"] ul { list-style: disc; padding-left: 1.5rem; margin: .5rem 0; }
        [data-testid="rte-content"] ol { list-style: decimal; padding-left: 1.5rem; margin: .5rem 0; }
        [data-testid="rte-content"] blockquote { border-left: 3px solid #f07c1e; padding-left: .75rem; color: #555; font-style: italic; margin: .75rem 0; }
        [data-testid="rte-content"] code { background: #f3f4f6; padding: 0 4px; border-radius: 4px; font-size: 0.9em; }
        [data-testid="rte-content"] a { color: #f07c1e; text-decoration: underline; }
        [data-testid="rte-content"] img { border-radius: 12px; margin: .75rem 0; }
        [data-testid="rte-content"] p.is-editor-empty:first-child::before {
          content: attr(data-placeholder); color: #c0c4cc; float: left; pointer-events: none; height: 0;
        }
      `}</style>
    </div>
  );
}
