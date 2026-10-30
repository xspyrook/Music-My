import React from 'react';
import { BookOpen, AlertTriangle, Cpu, Terminal, ShieldAlert, CheckCircle2, Zap, HardDrive } from 'lucide-react';

export const TechnicalGuide: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10 text-slate-100">
      {/* Hero header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>الدليل التقني الكامل والقيود</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          دليل بناء وتشغيل بيئة التطوير DroidForge IDE وقيود التجميع على أندرويد
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          شرح تفصيلي لكيفية تشغيل المشروع في أندرويد ستوديو، وتضمين أدوات البناء الرسمية على الهاتف (AAPT2 / D8 / Kotlinc)، مع استعراض القيود الأمنية وقيود الذاكرة لنظام أندرويد.
        </p>
      </div>

      {/* Section 1: How to build in Android Studio */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span>خطوات بناء المشروع وتشغيله على الهاتف (Build & Run Steps)</span>
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs flex items-center justify-center font-bold">1</span>
              <span>تنزيل وتصدير الكود البرمجي الكامل</span>
            </div>
            <p className="text-slate-400 text-xs pr-8">
              اضغط على زر <strong className="text-emerald-400">"تحميل كود المشروع الكامل (.ZIP)"</strong> في الشريط العلوي لتحميل حزمة المشروع المكتملة بكل ملفات Gradle و Kotlin و Manifest.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs flex items-center justify-center font-bold">2</span>
              <span>الفتح والمزامنة في Android Studio</span>
            </div>
            <p className="text-slate-400 text-xs pr-8">
              قم بفك الضغط وافتح المجلد في <strong>Android Studio (Iguana / Jellyfish أو أحدث)</strong>. تأكد من ضبط إصدار JDK على <strong>Java 17</strong> من:
              <br />
              <code className="text-emerald-400 font-mono">Settings → Build, Execution, Deployment → Build Tools → Gradle → Gradle JDK = 17</code>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs flex items-center justify-center font-bold">3</span>
              <span>تثبيت ملفات Toolchain في مجلد assets/</span>
            </div>
            <p className="text-slate-400 text-xs pr-8">
              ضع ملف <code className="text-amber-400 font-mono">android-34.jar</code> (الخاص بإطار عمل أندرويد الرسمي) وملفات <code className="text-amber-400 font-mono">aapt2</code> المترجمة لمعمارية aarch64 داخل مجلد <code className="text-slate-200 font-mono">app/src/main/assets/</code> ليتم استخراجها تلقائياً عند التشغيل الأول للتطبيق.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 text-xs flex items-center justify-center font-bold">4</span>
              <span>التشغيل ومنح الأذونات المطلوبة</span>
            </div>
            <p className="text-slate-400 text-xs pr-8">
              عند تشغيل التطبيق على هاتفك لأول مرة، سيطلب إذن <strong className="text-white">"الوصول إلى جميع الملفات" (MANAGE_EXTERNAL_STORAGE)</strong> وإذن <strong className="text-white">"تثبيت التطبيقات من هذا المصدر" (REQUEST_INSTALL_PACKAGES)</strong> ليتمكن من حفظ ملفات المشاريع وتثبيت الـ APK الناتج.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Important Technical Limitations & Warnings */}
      <div className="p-6 bg-slate-900 border border-amber-500/30 rounded-3xl space-y-6">
        <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>تحذيرات وقيود تقنية هامة لبناء التطبيقات على الهاتف نفسه (On-Device Constraints)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: RAM & Heap */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <HardDrive className="w-4 h-4" />
              <span>1. استهلاك الذاكرة (RAM & Heap Out-of-Memory)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              عمليات ترجمة Kotlin ومكتبات Jetpack Compose تتطلب ذاكرة JVM ضخمة أثناء تحليل الـ AST وبناء الـ IR. يُنصح دائماً بأن يمتلك الهاتف <strong>6GB RAM على الأقل</strong>، مع تفعيل خاصية <code className="text-rose-300 font-mono">android:largeHeap="true"</code> في المانيفست، واستخدام خيار <code className="text-slate-300 font-mono">-Xmx2048m</code> لمنع إغلاق التطبيق بواسطة الـ OOM Killer.
            </p>
          </div>

          {/* Card 2: W^X Execution Policy */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>2. قيود الأمان W^X في إصدارات Android 10+</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              تمنع أجهزة أندرويد الحديثة تنفيذ ملفات الـ Binary التنفيذية المباشرة (مثل AAPT2) من مجلدات التخزين العادية بسبب سياسة <code>W^X (Write XOR Execute)</code> و SELinux. الحل المتبع في التطبيقات الاحترافية مثل (AIDE و Termux) هو وضع ملفات الـ binary كـ Shared Libraries باسم <code className="text-amber-300 font-mono">libaapt2.so</code> داخل مجلد <code className="text-slate-300 font-mono">jniLibs/arm64-v8a/</code> ليسمح نظام أندرويد بتشغيلها قانونياً.
            </p>
          </div>

          {/* Card 3: Storage Permissions */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>3. قيود التخزين Scoped Storage في Android 11+</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ابتداءً من أندرويد 11 (API 30)، أصبحت أذونات READ/WRITE_EXTERNAL_STORAGE لا تكفي للوصول لمجلدات المشاريع العشوائية. ولذلك يطلب التطبيق إذن <code className="text-cyan-300 font-mono">MANAGE_EXTERNAL_STORAGE</code> عبر <code className="text-slate-300 font-mono">ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION</code> للسماح للمستخدم بتخزين مشاريعه في أي مكان بالذاكرة.
            </p>
          </div>

          {/* Card 4: Silent Install & Shizuku */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>4. تثبيت الـ APK والتكامل مع Shizuku</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              تثبيت التطبيقات العادي عبر <code className="text-emerald-300 font-mono">Intent.ACTION_VIEW</code> يُظهر نافذة تأكيد النظام في كل مرة تقوم بالبناء. لتجربة تطوير سلسة شبيهة بـ Android Studio الحقيقي، يمكن للمستخدم تفعيل تكامل <strong>Shizuku API</strong> (المعتمد على صلاحيات ADB أو Root) لتثبيت وتحديث التطبيق تلقائياً في الخلفية بدون مقاطعة المستخدم.
            </p>
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
        <h4 className="font-bold text-sm text-white">جدول الأدوات مفتوحة المصدر المستخدمة في المحرك</h4>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">المكتبة / الأداة</th>
                <th className="py-2.5 px-3">المهمة في المشروع</th>
                <th className="py-2.5 px-3">الترخيص</th>
                <th className="py-2.5 px-3">الحالة على الهاتف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              <tr>
                <td className="py-2.5 px-3 text-emerald-400 font-semibold">Sora Editor</td>
                <td className="py-2.5 px-3 font-sans">محرر الأكواد فائق السرعة مع تمييز لوني لـ Kotlin/XML</td>
                <td className="py-2.5 px-3">Apache 2.0</td>
                <td className="py-2.5 px-3 font-sans text-emerald-300">يعمل بسلاسة 100%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-cyan-400 font-semibold">D8 / R8 (Google)</td>
                <td className="py-2.5 px-3 font-sans">تحويل ملفات Bytecode .class إلى Dalvik Executable (DEX)</td>
                <td className="py-2.5 px-3">BSD-3</td>
                <td className="py-2.5 px-3 font-sans text-emerald-300">يعمل كـ Java API محلياً</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-amber-400 font-semibold">AAPT2 (Android Asset)</td>
                <td className="py-2.5 px-3 font-sans">تجميع الموارد والـ Drawables وتوليد R.java</td>
                <td className="py-2.5 px-3">Apache 2.0</td>
                <td className="py-2.5 px-3 font-sans text-amber-300">Native ELF عبر jniLibs</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-purple-400 font-semibold">BouncyCastle / ApkSigner</td>
                <td className="py-2.5 px-3 font-sans">توقيع ملفات الـ APK بشهادات التصحيح Debug Keystore</td>
                <td className="py-2.5 px-3">BouncyCastle MIT</td>
                <td className="py-2.5 px-3 font-sans text-emerald-300">يعمل بسلاسة 100%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-pink-400 font-semibold">Embedded Kotlinc / ECJ</td>
                <td className="py-2.5 px-3 font-sans">ترجمة ملفات Kotlin إلى كود بايت جافا</td>
                <td className="py-2.5 px-3">Apache 2.0</td>
                <td className="py-2.5 px-3 font-sans text-yellow-300">يحتاج ذاكرة RAM كافية (4GB+)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
