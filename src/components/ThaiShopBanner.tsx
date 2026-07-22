import React from 'react';
import { brandConfig } from '../brandConfig';
import { THAI_SHOP_BANNER_IMAGES } from '../lib/mediaUrls';

const PRODUCT_ALTS = [
  'Thai herbal balm product / ยาหม่องสมุนไพรไทย',
  'Thai massage oil bottle / น้ำมันนวดไทย',
  'Thai wellness cream / ครีมบรรเทาปวดสมุนไพรไทย',
] as const;

export const ThaiShopBanner = () => {
  return (
    <section className="py-10 md:py-12 bg-white" aria-label="Mira Wellness and Thai Shop">
      <div className="max-w-5xl mx-auto px-6">
        <a
          href={brandConfig.thaiShopUrl}
          className="thai-shop-banner group relative flex flex-col gap-5 rounded-[16px] px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5 md:gap-8"
        >
          {/* Clip layer for gradients + shine (keeps collage from being cropped) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 70% at 12% 50%, rgba(200,168,75,0.22) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 88% 40%, rgba(197,160,89,0.16) 0%, transparent 50%), radial-gradient(circle at 50% 120%, rgba(200,168,75,0.08) 0%, transparent 40%)',
              }}
            />
            <div className="thai-shop-banner-shine absolute inset-y-0 -left-1/3 w-1/3" />
            <span className="thai-shop-sparkle thai-shop-sparkle-1 absolute" />
            <span className="thai-shop-sparkle thai-shop-sparkle-2 absolute" />
            <span className="thai-shop-sparkle thai-shop-sparkle-3 absolute" />
          </div>

          {/* Left: overlapping product collage — 3 photos, diagonal stack */}
          <div className="relative z-10 h-[88px] w-[120px] shrink-0">
            {THAI_SHOP_BANNER_IMAGES.map((src, i) => {
              const stack = [
                'left-0 top-3 z-30 -rotate-[8deg]',
                'left-[28px] top-0 z-20 rotate-[5deg]',
                'left-[56px] top-4 z-10 -rotate-[3deg]',
              ] as const;
              return (
                <img
                  key={src}
                  src={src}
                  alt={PRODUCT_ALTS[i]}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className={`absolute h-14 w-14 rounded-full border-2 border-[#C8A84B] bg-[#1a1a1a] object-cover shadow-[0_4px_14px_rgba(0,0,0,0.55)] ${stack[i]}`}
                />
              );
            })}
          </div>

          {/* Centre: copy */}
          <div className="relative z-10 min-w-0 flex-1 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C8A84B] sm:text-[11px]">
              MIRA WELLNESS &amp; THAI SHOP
            </p>
            <h2 className="font-serif text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
              Authentic Thai Wellness, Right Here in Altona
            </h2>
            <p className="max-w-xl text-[13px] leading-snug text-white/70 sm:text-sm">
              Herbal balms, massage oils, pain relief creams, herbal teas, inhalers, ear candles
              &amp; more — Thai essentials for everyday wellbeing.
            </p>
          </div>

          {/* Right: CTA pill */}
          <div className="relative z-10 shrink-0 self-start sm:self-center">
            <span className="thai-shop-cta-pill inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C8A84B] via-[#E0C56E] to-[#C5A059] px-5 py-2.5 text-sm font-bold text-[#0f0f0f] transition-transform duration-300 group-hover:scale-[1.03]">
              Shop Now →
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};
