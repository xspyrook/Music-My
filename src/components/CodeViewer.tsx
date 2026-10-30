import React, { useState } from 'react';
import { AndroidFile } from '../types/androidProject';
import { Copy, Check, FileCode, HardDrive, CheckCircle2 } from 'lucide-react';

interface CodeViewerProps {
  file: AndroidFile;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ file }) => {
  const [copied, setCopied] = useState(false);

  const lines = file.content.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* File Header Bar */}
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-white">{file.path}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {file.extension}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{file.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1 font-mono">
            <span>{lines.length} أسطر</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              {(new Blob([file.content]).size / 1024).toFixed(1)} KB
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium text-xs border border-slate-700 active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ الكود بالكامل</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content with Line Numbers */}
      <div className="flex-1 overflow-auto font-mono text-xs leading-relaxed flex bg-[#0d1117] selection:bg-emerald-500/30">
        {/* Line Numbers Column */}
        <div className="py-4 pl-3 pr-2 select-none text-slate-600 text-right bg-[#090d13] border-r border-slate-800/80 sticky left-0 min-w-[3.5rem]">
          {lines.map((_, i) => (
            <div key={i} className="leading-6 text-[11px]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Lines */}
        <div className="py-4 px-4 flex-1 text-slate-200 overflow-x-auto whitespace-pre">
          {lines.map((line, i) => (
            <div key={i} className="leading-6 font-mono hover:bg-slate-800/30 px-1 rounded transition-colors">
              {formatCodeLine(line, file.extension)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple syntax-colorizer helper for Kotlin / Gradle / XML
function formatCodeLine(line: string, ext: string): React.ReactNode {
  if (!line.trim()) return <span>&nbsp;</span>;

  // Comments
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*') || line.trim().startsWith('<!--')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Imports / Package
  if (line.trim().startsWith('package ') || line.trim().startsWith('import ')) {
    return <span className="text-purple-400">{line}</span>;
  }

  // Annotations
  if (line.trim().startsWith('@')) {
    return <span className="text-amber-400 font-medium">{line}</span>;
  }

  // Keywords highlighting
  const words = line.split(/(\s+|[(){}[\]:,.;=<>"'])/);
  const keywords = new Set([
    'fun', 'val', 'var', 'class', 'interface', 'object', 'sealed', 'data', 'enum',
    'override', 'private', 'public', 'protected', 'suspend', 'return', 'if', 'else',
    'when', 'while', 'for', 'in', 'is', 'as', 'null', 'true', 'false', 'plugins',
    'dependencies', 'implementation', 'android', 'namespace', 'compileSdk', 'defaultConfig'
  ]);

  return (
    <span>
      {words.map((word, idx) => {
        if (keywords.has(word)) {
          return (
            <span key={idx} className="text-pink-400 font-semibold">
              {word}
            </span>
          );
        }
        if (word.startsWith('"') && word.endsWith('"')) {
          return (
            <span key={idx} className="text-emerald-300">
              {word}
            </span>
          );
        }
        return <span key={idx}>{word}</span>;
      })}
    </span>
  );
}
