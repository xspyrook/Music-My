import React, { useState } from 'react';
import { NATIVE_FILES } from './data/nativeAndroidCodebase';
import { AndroidFile } from './types/androidProject';
import { Header } from './components/Header';
import { FileTree } from './components/FileTree';
import { CodeViewer } from './components/CodeViewer';
import { MobileSimulator } from './components/MobileSimulator';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { TechnicalGuide } from './components/TechnicalGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState<'files' | 'simulator' | 'architecture' | 'guide'>('files');
  const [activeFile, setActiveFile] = useState<AndroidFile>(
    NATIVE_FILES.find((f) => f.path.includes('AndroidBuildPipeline.kt')) || NATIVE_FILES[0]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        fileCount={NATIVE_FILES.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'files' && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
            {/* Sidebar File Tree */}
            <div className="w-full lg:w-80 h-64 lg:h-full shrink-0 border-b lg:border-b-0 lg:border-l border-slate-800" dir="ltr">
              <FileTree
                files={NATIVE_FILES}
                activeFile={activeFile}
                onSelectFile={setActiveFile}
              />
            </div>

            {/* Code Viewer Panel */}
            <div className="flex-1 h-full overflow-hidden" dir="ltr">
              <CodeViewer file={activeFile} />
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="flex-1 overflow-y-auto">
            <MobileSimulator />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="flex-1 overflow-y-auto">
            <ArchitectureDiagram />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="flex-1 overflow-y-auto">
            <TechnicalGuide />
          </div>
        )}
      </main>
    </div>
  );
}
