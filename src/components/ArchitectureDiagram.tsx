import React from 'react';
import { Layers, Cpu, Database, HardDrive, Smartphone, ArrowDown, FileCode, Package, KeyRound, Wrench } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12 text-slate-100">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Clean Architecture + Offline Build Pipeline</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">معمارية النظام ومحرك البناء داخل الهاتف (On-Device)</h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          تصميم معزول يعمل بالكامل بنسبة 100% بدون أي سيرفر خارجي، يدمج بين طبقات Clean Architecture ومحرك تجميع Android Toolchain المصغر.
        </p>
      </div>

      {/* Part 1: Clean Architecture 3-Layers */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>1. طبقات التطبيق (Clean Architecture + MVVM + Hilt)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* UI Layer */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <h4>UI / Presentation Layer</h4>
            </div>
            <p className="text-xs text-slate-400">
              واجهات تفاعلية كاملة مبنية بـ Jetpack Compose Material 3 مع دعم الثيم المظلم والتوجيه (Navigation Compose).
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 text-slate-300">ProjectListScreen.kt</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">EditorScreen.kt + SoraEditor</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">FileExplorerScreen.kt</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">BuildScreen.kt (Live Terminal)</div>
              <div className="p-2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                ViewModels (Hilt + StateFlow)
              </div>
            </div>
          </div>

          {/* Domain Layer */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <h4>Domain Layer (Pure Kotlin)</h4>
            </div>
            <p className="text-xs text-slate-400">
              طبقة الأعمال المستقلة التي تحتوي على النماذج وقواعد إنشاء وتجميع التطبيقات دون أي ارتباط مباشر بإطارات العرض.
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 text-slate-300">Project.kt & ProjectFileItem</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">ProjectRepository (Interface)</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">BuildEngine (Interface)</div>
              <div className="p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                BuildStatus & BuildLog (Flows)
              </div>
            </div>
          </div>

          {/* Data Layer */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <HardDrive className="w-4 h-4" />
              <h4>Data Layer (Room & Toolchain)</h4>
            </div>
            <p className="text-xs text-slate-400">
              تخزين البيانات الوصفية محلياً في Room، والتعامل مع نظام ملفات الهاتف، وتنفيذ خط أنابيب أدوات البناء الرسمية.
            </p>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900 text-slate-300">AppDatabase.kt (Room)</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">ProjectDao.kt & ProjectEntity</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">ProjectRepositoryImpl.kt</div>
              <div className="p-2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                AndroidBuildPipeline.kt
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: The Real On-Device Compilation Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
          <Wrench className="w-5 h-5 text-emerald-400" />
          <span>2. دورة حياة بناء وتوليد ملف الـ APK محلياً (On-Device Toolchain)</span>
        </h3>

        <div className="relative">
          {/* Vertical flow cards */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">توليد هيكل الـ Gradle والمشروع (Project Scaffolding)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  توليد ملفات <code className="text-emerald-400 font-mono">settings.gradle.kts</code> و <code className="text-emerald-400 font-mono">build.gradle.kts</code> و <code className="text-emerald-400 font-mono">AndroidManifest.xml</code> و <code className="text-emerald-400 font-mono">MainActivity.kt</code> داخل مجلد المشروع.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">Filesystem I/O</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                02
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">معالجة وتجميع الموارد الرسومية عبر AAPT2</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  تشغيل <code className="text-amber-400 font-mono">aapt2 compile</code> على مجلد res لتوليد ملفات الموارد المضغوطة، ثم <code className="text-amber-400 font-mono">aapt2 link</code> لربطها بـ <code className="text-amber-400 font-mono">android-34.jar</code> وتوليد <code className="text-amber-400 font-mono">R.java</code> وحزمة <code className="text-amber-400 font-mono">resources.ap_</code>.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-amber-300">AAPT2 Binary</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                03
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">ترجمة كود Kotlin إلى Bytecode (.class) عبر Kotlinc</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  استدعاء Embedded Kotlin Compiler (<code className="text-blue-400 font-mono">K2JVMCompiler</code>) لترجمة ملفات Kotlin/Java مع ربطها مع Android Framework JAR لتوليد ملفات الـ Bytecode في مجلد <code className="text-slate-300 font-mono">classes/</code>.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-blue-300">Kotlinc / ECJ</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                04
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">تحويل الـ Bytecode إلى Dalvik Executable عبر أداة D8</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  تشغيل مكتبة <code className="text-purple-400 font-mono">com.android.tools.r8.D8</code> المضمنة لتحويل ملفات .class إلى ملف <code className="text-purple-400 font-mono">classes.dex</code> مع تنفيذ Desugaring لدعم Java 8+ APIs.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-purple-300">D8 Dexer</span>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                05
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-white">حزم وتوقيع الـ APK (ApkSigner & Zipalign)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  دمج ملفات الـ DEX مع الموارد داخل ملف ZIP/APK، ثم توقيع الحزمة بشهادة تصحيح Debug Keystore (v1/v2 Signature) باستخدام مكتبة BouncyCastle أو ZipSigner ليكون الملف جاهزاً تماماً للتثبيت.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-emerald-300">ApkSigner v2</span>
            </div>

            {/* Step 6 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                06
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-emerald-300">تثبيت التطبيق على نفس الهاتف عبر Intent</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  إرسال <code className="text-white font-mono">Intent.ACTION_VIEW</code> مع <code className="text-white font-mono">FileProvider</code> و <code className="text-white font-mono">REQUEST_INSTALL_PACKAGES</code> لنظام أندرويد لفتح نافذة التثبيت فوراً أو التثبيت الصامت عبر Shizuku API.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500 text-slate-950">PackageInstaller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
