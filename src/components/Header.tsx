import React, { useState } from 'react';
import { Smartphone, Download, Layers, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';
import { exportProjectAsZip, downloadBlob } from '../utils/zipExporter';

interface HeaderProps {
  activeTab: 'files' | 'simulator' | 'architecture' | 'guide';
  onTabChange: (tab: 'files' | 'simulator' | 'architecture' | 'guide') => void;
  fileCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, fileCount }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const blob = await exportProjectAsZip();
      downloadBlob(blob, 'DroidForge-IDE-Android-Studio-Project.zip');
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950">
              <Smartphone className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">DroidForge IDE</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Native Android Kotlin
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                بيئة تطوير وبناء تطبيقات أندرويد حقيقية على الهاتف نفسه
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-sm">
            <button
              onClick={() => onTabChange('files')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'files'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>أكواد المشروع ({fileCount})</span>
            </button>
            <button
              onClick={() => onTabChange('simulator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'simulator'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>المعاينة التفاعلية للهاتف</span>
            </button>
            <button
              onClick={() => onTabChange('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'architecture'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>المعمارية ومحرك البناء</span>
            </button>
            <button
              onClick={() => onTabChange('guide')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'guide'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>دليل البناء والقيود</span>
            </button>
          </nav>

          {/* Actions: Download Project ZIP */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition shadow-md shadow-emerald-500/25 active:scale-95 disabled:opacity-50"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                  <span>تم التنزيل!</span>
                </>
              ) : (
                <>
                  <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
                  <span className="hidden md:inline">تحميل كود المشروع الكامل (.ZIP)</span>
                  <span className="md:hidden">تحميل ZIP</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
