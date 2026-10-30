import React, { useState } from 'react';
import { AndroidFile } from '../types/androidProject';
import { Folder, FolderOpen, FileCode, FileText, Check, Copy } from 'lucide-react';

interface FileTreeProps {
  files: AndroidFile[];
  activeFile: AndroidFile;
  onSelectFile: (file: AndroidFile) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ files, activeFile, onSelectFile }) => {
  const [filter, setFilter] = useState<'all' | 'kotlin' | 'gradle' | 'manifest'>('all');
  const [copiedAll, setCopiedAll] = useState(false);

  const filteredFiles = files.filter((f) => {
    if (filter === 'all') return true;
    if (filter === 'kotlin') return f.category === 'kotlin';
    if (filter === 'gradle') return f.category === 'gradle';
    if (filter === 'manifest') return f.category === 'manifest' || f.category === 'res';
    return true;
  });

  const copyStructure = () => {
    const list = files.map((f) => f.path).join('\n');
    navigator.clipboard.writeText(list);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      {/* Search / Filter header */}
      <div className="p-3 border-b border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-slate-200">
            <FolderOpen className="w-4 h-4 text-emerald-400" />
            <span>شجرة ملفات المشروع ({files.length})</span>
          </div>
          <button
            onClick={copyStructure}
            className="flex items-center gap-1 hover:text-white transition px-1.5 py-0.5 rounded hover:bg-slate-800"
            title="نسخ مسارات شجرة الملفات"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">نسخ الهيكل</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 text-xs">
          {(
            [
              { id: 'all', label: 'الكل' },
              { id: 'kotlin', label: 'Kotlin' },
              { id: 'gradle', label: 'Gradle' },
              { id: 'manifest', label: 'Manifest/XML' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition ${
                filter === cat.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredFiles.map((file) => {
          const isSelected = activeFile.path === file.path;
          return (
            <button
              key={file.path}
              onClick={() => onSelectFile(file)}
              className={`w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-xs transition group ${
                isSelected
                  ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              {file.category === 'kotlin' ? (
                <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-purple-400'}`} />
              ) : file.category === 'gradle' ? (
                <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-cyan-400'}`} />
              ) : (
                <FileText className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-amber-400'}`} />
              )}
              <div className="truncate flex-1">
                <div className="truncate font-mono">{file.name}</div>
                <div className="text-[10px] text-slate-500 truncate group-hover:text-slate-400 font-mono">
                  {file.path}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>Clean Architecture + MVVM</span>
        <span className="text-emerald-400 font-mono">SDK 34</span>
      </div>
    </div>
  );
};
