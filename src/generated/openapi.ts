// Code generated from contracts/openapi.yaml (v1.0.0). DO NOT EDIT.

export type ErrorCode =
  | 'ACTIVE_DEVICE_CONFLICT'
  | 'DEVICE_REVOKED'
  | 'UNAUTHORIZED'
  | 'VALIDATION_FAILED'
  | 'NOT_FOUND'
  | 'PURCHASE_INVALID'
  | 'NO_EVENT_CREDITS'
  | 'PASS_ALREADY_ACTIVE'
  | 'FREE_QUOTA_EXHAUSTED'
  | 'GALLERY_DISABLED'
  | 'INTERNAL';

export interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
  };
}

export type PhotoStatus = 'UPLOADING' | 'READY' | 'FAILED';

export type WatermarkPosition =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_CENTER';

export interface PublicEventSummary {
  id: string;
  name: string;
  is_gallery_public: boolean;
}

export interface PublicStudioSummary {
  name: string;
  /** Normalized full URL (e.g. https://instagram.com/lensakita) or null if empty (OQ-13) */
  instagram: string | null;
  /** Normalized full URL (e.g. https://wa.me/628123456789) or null if empty (OQ-13) */
  whatsapp: string | null;
}

/** Response from GET /api/v1/public/photos/{photo_uuid} (D-07, D-24, FR-WEB-01, FR-WEB-02) */
export interface PublicPhoto {
  photo_uuid: string;
  status: PhotoStatus;
  /** https://lh3.googleusercontent.com/d/{drive_file_id}=w1600 — null until READY (D-24) */
  preview_url: string | null;
  /** https://drive.google.com/uc?export=download&id={drive_file_id} — null until READY (D-24) */
  download_url: string | null;
  event: PublicEventSummary;
  studio: PublicStudioSummary;
}

export interface GalleryItem {
  photo_uuid: string;
  preview_url: string;
  download_url: string;
  taken_at: string;
}

/** Response from GET /api/v1/public/events/{event_id}/gallery (D-25, OQ-11) */
export interface GalleryPage {
  items: GalleryItem[];
  /** Next integer offset string (e.g. "30"), or null when there are no more pages */
  next_cursor: string | null;
}
