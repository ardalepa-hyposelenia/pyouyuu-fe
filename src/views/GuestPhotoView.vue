<script setup lang="ts">
// D-07, D-24, D-25, FR-WEB-01, FR-WEB-02, BRD §2.2.4
import { APP_NAME, VUE_UPLOAD_POLL_INTERVAL_MS } from '../generated/constants';
import { t } from '../i18n';

defineProps<{
  photoUuid: string;
}>();
</script>

<template>
  <main class="min-h-screen flex flex-col justify-between bg-neutral-950 text-neutral-100 p-4">
    <section class="max-w-lg mx-auto w-full py-8 text-center" data-testid="photo-container">
      <p class="text-sm text-neutral-400" data-testid="uploading-status">
        {{ t('uploadingTitle') }}
      </p>
      <p class="text-xs text-neutral-500 mt-1" data-testid="photo-uuid">
        ID: {{ photoUuid }} (poll: {{ VUE_UPLOAD_POLL_INTERVAL_MS }}ms)
      </p>
    </section>

    <footer class="py-4 text-center text-xs text-neutral-500" data-testid="powered-by-footer">
      {{ t('poweredBy') }} {{ APP_NAME }}
    </footer>
  </main>
</template>
