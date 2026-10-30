import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Play,
  FolderOpen,
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Settings,
  CheckCircle2,
  AlertCircle,
  FileCode,
  FileText,
  RotateCcw,
  Check
} from 'lucide-react';

export const MobileSimulator: React.FC = () => {
  // Screens: 'projects' | 'editor' | 'build' | 'settings'
  const [currentScreen, setCurrentScreen] = useState<'projects' | 'editor' | 'build'>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showFileExplorerDrawer, setShowFileExplorerDrawer] = useState(false);

  // Projects list
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'MyComposeApp',
      packageName: 'com.example.mycomposeapp',
      template: 'Empty Compose Activity',
      modified: 'الآن',
      files: [
        {
          name: 'MainActivity.kt',
          path: 'app/src/main/java/com/example/mycomposeapp/MainActivity.kt',
          content: `package com.example.mycomposeapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "مرحباً! تم بناء هذا التطبيق على هاتفي الأندرويد!",
                            style = MaterialTheme.typography.headlineMedium
                        )
                    }
                }
            }
        }
    }
}`
        },
        {
          name: 'AndroidManifest.xml',
          path: 'app/src/main/AndroidManifest.xml',
          content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:label="MyComposeApp"
        android:theme="@android:style/Theme.Material.Light.NoActionBar">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
        },
        {
          name: 'build.gradle.kts',
          path: 'app/build.gradle.kts',
          content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.mycomposeapp"
    compileSdk = 34
    defaultConfig {
        applicationId = "com.example.mycomposeapp"
        minSdk = 26
        targetSdk = 34
    }
}`
        }
      ]
    },
    {
      id: 2,
      name: 'CounterPro',
      packageName: 'com.example.counterpro',
      template: 'Counter App',
      modified: 'منذ ساعتين',
      files: [
        {
          name: 'MainActivity.kt',
          path: 'app/src/main/java/com/example/counterpro/MainActivity.kt',
          content: `package com.example.counterpro

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            var count by remember { mutableStateOf(0) }
            Column(
                modifier = Modifier.fillMaxSize().padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text("عداد Compose", style = MaterialTheme.typography.titleLarge)
                Spacer(modifier = Modifier.height(16.dp))
                Text("$count", style = MaterialTheme.typography.displayLarge)
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { count++ }) { Text("زيادة (+1)") }
            }
        }
    }
}`
        }
      ]
    }
  ]);

  // Form for new project
  const [newProjectName, setNewProjectName] = useState('SuperCalculator');
  const [newProjectPkg, setNewProjectPkg] = useState('com.example.supercalculator');
  const [newProjectTemplate, setNewProjectTemplate] = useState('Empty Compose Activity');

  // Active file inside editor
  const [activeFileName, setActiveFileName] = useState('MainActivity.kt');
  const [editorCode, setEditorCode] = useState('');
  const [isSaved, setIsSaved] = useState(true);

  // Build simulator state
  const [buildStep, setBuildStep] = useState<number>(0);
  const [buildLogs, setBuildLogs] = useState<Array<{ step: string; msg: string; color: string }>>([]);
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildComplete, setBuildComplete] = useState<boolean>(false);
  const [installPrompt, setInstallPrompt] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Sync editor code with selected project
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  useEffect(() => {
    const file = currentProject.files.find((f) => f.name === activeFileName) || currentProject.files[0];
    if (file) {
      setEditorCode(file.content);
      setActiveFileName(file.name);
      setIsSaved(true);
    }
  }, [selectedProjectId, activeFileName]);

  // Handle building simulation
  const startBuildSimulation = () => {
    setIsBuilding(true);
    setBuildComplete(false);
    setInstallPrompt(false);
    setBuildLogs([]);
    setBuildStep(1);

    const steps = [
      { step: 'INIT', msg: '🚀 بدء عملية البناء لمشروع ' + currentProject.name, color: 'text-cyan-400', delay: 300 },
      { step: 'SDK', msg: 'تحميل Android Framework: android-34.jar (28.4 MB)', color: 'text-slate-300', delay: 700 },
      { step: 'AAPT2', msg: 'aapt2 compile: تجميع موارد XML والصور النقطية', color: 'text-amber-400', delay: 1200 },
      { step: 'AAPT2', msg: 'aapt2 link: ربط الموارد وتوليد R.java و resources.ap_', color: 'text-amber-400', delay: 1800 },
      { step: 'KOTLINC', msg: 'kotlinc: ترجمة أكواد Kotlin إلى Java Bytecode (.class)', color: 'text-blue-400', delay: 2600 },
      { step: 'D8', msg: 'd8: تحويل 14 ملف .class إلى Dalvik Executable (classes.dex)', color: 'text-purple-400', delay: 3400 },
      { step: 'PACKAGE', msg: 'apkbuilder: دمج classes.dex مع resources.ap_', color: 'text-indigo-400', delay: 4100 },
      { step: 'SIGNER', msg: 'apksigner: توقيع الحزمة بمفتاح تصحيح أندرويد (Debug Keystore)', color: 'text-emerald-400', delay: 4800 },
      { step: 'SUCCESS', msg: `✅ تم إنشاء ${currentProject.name}-debug.apk بنجاح! الحجم: 3.8 MB`, color: 'text-emerald-400 font-bold', delay: 5400 },
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        setBuildLogs((prev) => [...prev, { step: s.step, msg: s.msg, color: s.color }]);
        setBuildStep(Math.round(((idx + 1) / steps.length) * 100));
        if (idx === steps.length - 1) {
          setIsBuilding(false);
          setBuildComplete(true);
        }
      }, s.delay);
    });
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [buildLogs]);

  const handleCreateProject = () => {
    const newProj = {
      id: Date.now(),
      name: newProjectName,
      packageName: newProjectPkg,
      template: newProjectTemplate,
      modified: 'الآن',
      files: [
        {
          name: 'MainActivity.kt',
          path: `app/src/main/java/${newProjectPkg.replace(/\./g, '/')}/MainActivity.kt`,
          content: `package ${newProjectPkg}

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.ui.Modifier

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Text("مرحباً من ${newProjectName}!")
            }
        }
    }
}`
        },
        {
          name: 'AndroidManifest.xml',
          path: 'app/src/main/AndroidManifest.xml',
          content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application android:label="${newProjectName}">
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
        }
      ]
    };

    setProjects([newProj, ...projects]);
    setSelectedProjectId(newProj.id);
    setShowNewProjectModal(false);
    setCurrentScreen('editor');
  };

  const handleInsertSymbol = (sym: string) => {
    setEditorCode((prev) => prev + sym);
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:p-8 bg-slate-950 min-h-[calc(100vh-4rem)]">
      {/* Device Frame */}
      <div className="w-full max-w-[410px] h-[810px] bg-slate-900 rounded-[48px] p-3.5 shadow-2xl shadow-emerald-500/10 border-4 border-slate-700/80 flex flex-col relative select-none ring-1 ring-slate-800">
        {/* Phone Speaker & Camera Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-3.5 h-3.5 bg-slate-950 rounded-full border border-slate-800"></div>
        </div>

        {/* Screen Bezel Content */}
        <div className="w-full h-full bg-[#12161f] rounded-[38px] overflow-hidden flex flex-col relative text-slate-100 font-sans border border-slate-800">
          {/* Status Bar */}
          <div className="h-8 bg-slate-900/95 px-6 flex items-center justify-between text-[11px] text-slate-400 z-20 shrink-0">
            <span className="font-semibold text-slate-300">09:41</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* SCREEN 1: PROJECTS LIST */}
          {currentScreen === 'projects' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
              {/* App Bar */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    DF
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-white">DroidForge IDE</h2>
                    <p className="text-[10px] text-emerald-400 font-medium">مشاريع أندرويد المحلية</p>
                  </div>
                </div>
                <button
                  onClick={() => alert('إعدادات IDE: SDK 34, Heap: 2048MB, Offline Toolchain')}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Projects List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
                  <span>المشاريع الحالية ({projects.length})</span>
                  <span className="text-[10px] text-slate-500">مخزنة محلياً في /data</span>
                </div>

                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setCurrentScreen('editor');
                    }}
                    className="p-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 rounded-2xl cursor-pointer transition flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/10">
                        <Smartphone className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xs text-white group-hover:text-emerald-300 transition">
                          {proj.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-mono">{proj.packageName}</p>
                        <div className="flex items-center gap-2 mt-1 text-[9px] text-slate-500">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {proj.template}
                          </span>
                          <span>• {proj.modified}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (projects.length > 1) {
                          setProjects(projects.filter((p) => p.id !== proj.id));
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* FAB: New Project */}
              <div className="p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>إنشاء مشروع Compose جديد</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 2: CODE EDITOR (Sora Editor Look) */}
          {currentScreen === 'editor' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0d1117]">
              {/* Editor Top Bar */}
              <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentScreen('projects')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-semibold text-emerald-300">{activeFileName}</span>
                      {!isSaved && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="غير محفوظ"></span>}
                    </div>
                    <span className="text-[9px] text-slate-500">{currentProject.name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowFileExplorerDrawer(true)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    title="ملفات المشروع"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsSaved(true)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    title="حفظ"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsSaved(true);
                      setCurrentScreen('build');
                      startBuildSimulation();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm shadow-emerald-500/25"
                    title="بناء وتشغيل على الهاتف"
                  >
                    <Play className="w-3 h-3 fill-slate-950" />
                    <span>Run</span>
                  </button>
                </div>
              </div>

              {/* File Tabs */}
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-950 border-b border-slate-800/80 overflow-x-auto text-[10px] font-mono">
                {currentProject.files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFileName(file.name)}
                    className={`px-2 py-1 rounded flex items-center gap-1 shrink-0 ${
                      activeFileName === file.name
                        ? 'bg-slate-800 text-emerald-300 font-medium'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <FileCode className="w-3 h-3" />
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>

              {/* Code Editor Surface with Line Numbers */}
              <div className="flex-1 overflow-auto flex font-mono text-[11px] leading-5 bg-[#090d13]">
                {/* Line Numbers */}
                <div className="py-2 px-2 select-none text-slate-600 text-right bg-[#06090e] border-r border-slate-800/60 sticky left-0 shrink-0 min-w-[2.2rem]">
                  {editorCode.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Textarea for live typing */}
                <textarea
                  value={editorCode}
                  onChange={(e) => {
                    setEditorCode(e.target.value);
                    setIsSaved(false);
                  }}
                  className="flex-1 p-2 bg-transparent text-slate-200 outline-none resize-none font-mono text-[11px] leading-5 whitespace-pre selection:bg-emerald-500/30 overflow-x-auto"
                  spellCheck={false}
                />
              </div>

              {/* Quick Symbols Bar for Mobile Typing */}
              <div className="p-1.5 bg-slate-900 border-t border-slate-800 flex items-center gap-1 overflow-x-auto shrink-0">
                {['{', '}', '(', ')', '[', ']', ';', ':', '=', '->', 'fun', 'val', 'var', '@Composable'].map(
                  (sym) => (
                    <button
                      key={sym}
                      onClick={() => handleInsertSymbol(sym)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 active:bg-emerald-500 active:text-slate-950 rounded text-[10px] text-slate-300 font-mono transition shrink-0"
                    >
                      {sym}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* SCREEN 3: ON-DEVICE BUILD TERMINAL */}
          {currentScreen === 'build' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0f16]">
              {/* App Bar */}
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentScreen('editor')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h3 className="font-bold text-xs text-white">سجل بناء الـ APK داخل الهاتف</h3>
                    <p className="text-[9px] text-emerald-400 font-mono">AAPT2 → Kotlinc → D8 → Signer</p>
                  </div>
                </div>
                <button
                  onClick={startBuildSimulation}
                  disabled={isBuilding}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-300 disabled:opacity-40"
                  title="إعادة البناء"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isBuilding ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300"
                  style={{ width: `${buildStep}%` }}
                ></div>
              </div>

              {/* Live Terminal Log Stream */}
              <div ref={terminalRef} className="flex-1 p-3 overflow-y-auto font-mono text-[10px] space-y-1.5">
                {buildLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-500 shrink-0">[{log.step}]</span>
                    <span className={log.color}>{log.msg}</span>
                  </div>
                ))}
                {isBuilding && (
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] pt-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                    <span>جارٍ معالجة بايت كود Dalvik...</span>
                  </div>
                )}
              </div>

              {/* Action Sheet at bottom */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-col gap-2">
                {buildComplete ? (
                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="text-[10px]">
                        <div className="text-emerald-300 font-semibold">APK جاهز للتثبيت الفوري!</div>
                        <div className="text-slate-400">حزمة موقعة بمفتاح Debug Keystore</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setInstallPrompt(true)}
                      className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-98"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>تثبيت الـ APK على الهاتف الآن (Install)</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-[10px] text-slate-400 py-1">
                    {isBuilding ? 'البناء قيد التنفيذ محلياً دون اتصال بالإنترنت...' : 'جاهز للبدء'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SIMULATED ANDROID PACKAGE INSTALLER MODAL */}
          {installPrompt && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-[320px] bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 mx-auto flex items-center justify-center text-slate-950 shadow-lg">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">تثبيت {currentProject.name}؟</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    هل تريد تثبيت هذا التطبيق؟ تم توليده وتوقيعه مباشرة عبر DroidForge IDE.
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 text-[10px] text-slate-300 font-mono text-left">
                  <div>Package: {currentProject.packageName}</div>
                  <div>Size: 3.8 MB • MinSDK: 26</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInstallPrompt(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => {
                      alert(`تم تثبيت ${currentProject.name} بنجاح! تم استدعاء android.content.pm.PackageInstaller.`);
                      setInstallPrompt(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    تثبيت (Install)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FILE EXPLORER MODAL DRAWER */}
          {showFileExplorerDrawer && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xs z-40 flex flex-col justify-end">
              <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl max-h-[70%] p-4 flex flex-col space-y-3">
                <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto"></div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">ملفات {currentProject.name}</span>
                  <button
                    onClick={() => setShowFileExplorerDrawer(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    إغلاق
                  </button>
                </div>

                <div className="space-y-1 overflow-y-auto">
                  {currentProject.files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => {
                        setActiveFileName(file.name);
                        setShowFileExplorerDrawer(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs flex items-center gap-2 font-mono ${
                        activeFileName === file.name
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <FileCode className="w-4 h-4 text-emerald-400" />
                      <span className="truncate flex-1">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NEW PROJECT MODAL */}
          {showNewProjectModal && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-[320px] bg-slate-900 border border-slate-700 rounded-3xl p-4 shadow-2xl space-y-3 text-right">
                <h4 className="font-bold text-xs text-white">مشروع Jetpack Compose جديد</h4>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">اسم التطبيق</label>
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => {
                        setNewProjectName(e.target.value);
                        setNewProjectPkg('com.example.' + e.target.value.toLowerCase().replace(/\s+/g, ''));
                      }}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">معرف الحزمة (Package)</label>
                    <input
                      type="text"
                      value={newProjectPkg}
                      onChange={(e) => setNewProjectPkg(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 outline-none font-mono text-[10px]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">القالب الأساسي</label>
                    <select
                      value={newProjectTemplate}
                      onChange={(e) => setNewProjectTemplate(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs"
                    >
                      <option>Empty Compose Activity</option>
                      <option>Counter App</option>
                      <option>Canvas Drawing App</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setShowNewProjectModal(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCreateProject}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    إنشاء
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Android Navigation Bar */}
          <div className="h-6 bg-slate-950 flex items-center justify-center shrink-0">
            <div className="w-28 h-1 bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
