export interface AndroidFile {
  path: string;
  name: string;
  extension: string;
  category: 'gradle' | 'manifest' | 'kotlin' | 'res' | 'doc';
  content: string;
  description: string;
}

export interface BuildLogEntry {
  id: string;
  step: 'AAPT2_COMPILE' | 'AAPT2_LINK' | 'KOTLINC' | 'D8_DEX' | 'APK_PACK' | 'APK_SIGN' | 'DONE';
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  packageName: string;
  files: { path: string; content: string }[];
}
