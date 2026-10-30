import JSZip from 'jszip';
import { NATIVE_FILES } from '../data/nativeAndroidCodebase';

export async function exportProjectAsZip(): Promise<Blob> {
  const zip = new JSZip();

  // إضافة جميع الملفات البرمجية بالمسارات الصحيحة
  NATIVE_FILES.forEach((file) => {
    zip.file(file.path, file.content);
  });

  // إضافة ملفات مساعدة مثل gradlew و gradle-wrapper.properties
  zip.file(
    'gradle/wrapper/gradle-wrapper.properties',
    `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.7-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`
  );

  zip.file(
    'README.md',
    `# DroidForge IDE - Native On-Device Android Studio (Kotlin + Jetpack Compose)

هذا هو المشروع الكامل لبناء تطبيق DroidForge IDE على هاتفك الأندرويد.

## 🚀 كيفية فتح وتشغيل المشروع
1. فك ضغط هذا الأرشيف.
2. افتح مجلد المشروع في **Android Studio Iguana / Jellyfish أو أحدث**.
3. تأكد من ضبط JDK على الإصدار 17 (Java 17).
4. اضغط على Sync Project with Gradle Files.
5. شغّل المشروع على هاتف حقيقي بنظام Android 8.0 (API 26) أو أحدث.

## 📱 ميزات التطبيق على الهاتف:
- إنشاء مشاريع Jetpack Compose حقيقية.
- محرر نصوص فائق الخفة مبني على Sora Editor مع Syntax Highlighting.
- مستكشف ملفات متكامل.
- محرك بناء محلي On-Device (AAPT2 + D8 + ApkSigner).
- تثبيت الـ APK على الهاتف مباشرة فور انتهاء البناء.
`
  );

  return await zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
