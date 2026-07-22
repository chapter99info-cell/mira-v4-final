/** Stable CDN URLs — Supabase public bucket + Unsplash fallbacks */
export const MIND_BODY_VIDEO_URL =
  'https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/VDO/Mix02.mp4';

export const THAI_MASSAGE_NO_OIL_VIDEO_URL =
  'https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/VDO/Thai%20Massage%20without%20oil.mp4';

export const HERO_IMAGE_URL =
  'https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/hero%20cover/c873e685-e8e4-4555-88a7-7bdda13934a3.jpg';

const SERVICE_CARDS_BASE =
  'https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/service%20cards';

export const SERVICE_CARD_IMAGE_URL = `${SERVICE_CARDS_BASE}/oli01.png`;

export const SERVICE_THAI_RELAXATION_IMAGE = `${SERVICE_CARDS_BASE}/oli01.png`;
export const SERVICE_THAI_DEEP_TISSUE_OIL_IMAGE = `${SERVICE_CARDS_BASE}/oil_hand.png`;
export const SERVICE_THAI_NO_OIL_IMAGE = `${SERVICE_CARDS_BASE}/backThai%20Deep%20Tissue.png`;
export const SERVICE_ACCREDITED_OIL_IMAGE = `${SERVICE_CARDS_BASE}/001cover.png`;
export const SERVICE_ACCREDITED_DEEP_TISSUE_IMAGE = `${SERVICE_CARDS_BASE}/oil_hand.png`;

export const LOGO_IMAGE_URL =
  'https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/Logo/Logo%20-%20MIRA-02.jpg';

const BANNER_BASE =
  'https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/Banner';

export const THAI_SHOP_BANNER_IMAGES = [
  `${BANNER_BASE}/12f9078e-34c6-4616-9b24-44a9dbde7dee.jpg`,
  `${BANNER_BASE}/6a83a601-c657-43f4-82da-98a070897a14.jpg`,
  `${BANNER_BASE}/4cfec0ed-b12a-4bad-9e69-6d2cb88e6833.jpg`,
] as const;
