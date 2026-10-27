import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import {
  APP_NAME,
  DEFAULT_PUBLIC_WEB_DOMAIN,
  VUE_UPLOAD_POLL_INTERVAL_MS,
  GALLERY_PAGE_SIZE_DEFAULT,
} from '../generated/constants';
import { detectLocale, currentLocale, t } from '../i18n';
import { routes } from '../router';
import GuestPhotoView from '../views/GuestPhotoView.vue';

describe('T-W01 Web Guest Portal Scaffold', () => {
  it('uses generated constants from contracts/constants.json (v1.0.0)', () => {
    expect(APP_NAME).toBe('Pyouyuu');
    expect(DEFAULT_PUBLIC_WEB_DOMAIN).toBe('pyouyuu.com');
    expect(VUE_UPLOAD_POLL_INTERVAL_MS).toBe(2500);
    expect(GALLERY_PAGE_SIZE_DEFAULT).toBe(30);
  });

  it('defines strictly the /p/:photoUuid guest route with zero auth or checkout routes (D-04, D-09, D-18)', () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/p/:photoUuid');
    expect(routes[0].name).toBe('guest-photo');
  });

  it('supports Bahasa Indonesia (default) and English localization (D-03)', () => {
    expect(detectLocale('id-ID')).toBe('id');
    expect(detectLocale('en-US')).toBe('en');

    currentLocale.value = 'id';
    expect(t('downloadHd')).toBe('Unduh Foto HD');

    currentLocale.value = 'en';
    expect(t('downloadHd')).toBe('Download HD Photo');
  });

  it('renders GuestPhotoView with Powered by Pyouyuu footer (BRD 2.2.4, OQ-02)', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    await router.push('/p/123e4567-e89b-12d3-a456-426614174000');
    await router.isReady();

    const wrapper = mount(GuestPhotoView, {
      props: { photoUuid: '123e4567-e89b-12d3-a456-426614174000' },
      global: { plugins: [router] },
    });

    expect(wrapper.get('[data-testid="powered-by-footer"]').text()).toContain('Powered by Pyouyuu');
    expect(wrapper.get('[data-testid="photo-uuid"]').text()).toContain('123e4567-e89b-12d3-a456-426614174000');
  });
});
