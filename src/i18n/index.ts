// D-03: English + Bahasa Indonesia support, default 'id', detect from navigator.language.
import { ref } from 'vue';

export type Locale = 'id' | 'en';

export const messages = {
  id: {
    uploadingTitle: 'Foto Anda sedang diproses...',
    uploadingSubtitle: 'Halaman ini akan memperbarui secara otomatis dalam beberapa detik.',
    downloadHd: 'Unduh Foto HD',
    capturedBy: 'Diambil oleh',
    eventGallery: 'Galeri Acara',
    galleryDisabled: 'Galeri acara dinonaktifkan oleh fotografer.',
    poweredBy: 'Powered by',
  },
  en: {
    uploadingTitle: 'Your photo is being uploaded...',
    uploadingSubtitle: 'This page will automatically update in a few seconds.',
    downloadHd: 'Download HD Photo',
    capturedBy: 'Captured by',
    eventGallery: 'Event Gallery',
    galleryDisabled: 'Event gallery is disabled by the photographer.',
    poweredBy: 'Powered by',
  },
} as const;

export function detectLocale(navLang?: string): Locale {
  const lang = (navLang ?? (typeof navigator !== 'undefined' ? navigator.language : 'id')).toLowerCase();
  return lang.startsWith('en') ? 'en' : 'id';
}

export const currentLocale = ref<Locale>(detectLocale());

export function t(key: keyof (typeof messages)['id']): string {
  return messages[currentLocale.value][key];
}
