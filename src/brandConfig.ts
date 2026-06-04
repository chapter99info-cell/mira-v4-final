import { Service, Staff, Holiday } from './types';
import { HERO_IMAGE_URL, HERO_VIDEO_URL, SERVICE_CARD_IMAGE_URL, LOGO_IMAGE_URL } from './lib/mediaUrls';

export const brandConfig = {
  name: "Mira Thai Massage Altona (HICAPS)",
  description: "Experience Thai Combination Massage with premium Magnesium Oil therapy — designed to relieve muscle tension, reduce stress, support recovery, and promote deep relaxation",
  location: "Level 1/76 Pier Street, Altona 3018",
  phone: "0466992456",
  bookingUrl: "https://mira.book.receptionerapp.com/",
  googleReviewLink: "https://maps.app.goo.gl/L2fyvazbuX3s56Rj8",
  email: "miraremedial@gmail.com",
  logo: LOGO_IMAGE_URL,
  heroImage: HERO_IMAGE_URL,
  heroVideo: HERO_VIDEO_URL,
  promoVideo: "",
  colors: {
    primary: "#4A5D23",
    secondary: "#C5A059",
    background: "#FFFFFF",
    section: "#FAFAF5",
    earth: "#2D2A26",
    sage: "#8A9A5B",
  },
  services: [
    {
      id: "thai-relaxation-oil",
      name: "Thai Relaxation Combination with oil massage",
      description: "A perfect blend of traditional Thai stretching and soothing aromatherapy oil massage. This treatment uses long, rhythmic strokes to reduce stress and improve circulation. Ideal for those seeking pure relaxation and a recharge for the body and mind.",
      fullPrice: 90,
      depositAmount: 30,
      duration: 60,
      image: HERO_IMAGE_URL,
      rates: { "30": 60, "45": 75, "60": 90, "90": 130 },
      bestFor: "Stress relief & pure relaxation",
      keyBenefits: ["Stress Relief", "Gentle Stretching", "Aromatherapy"],
      category: 'Standard',
      is_my_pick: true
    },
    {
      id: "thai-deep-tissue-oil",
      name: "Thai Deep Tissue combination with oil massage",
      description: "Designed to target chronic muscle tension and \"knots\" (trigger points). By using oil to reduce friction, our therapists can apply deeper pressure to reach underlying muscle layers more effectively without over-sensitivity.",
      fullPrice: 95,
      depositAmount: 30,
      duration: 60,
      image: SERVICE_CARD_IMAGE_URL,
      rates: { "30": 65, "45": 80, "60": 95, "90": 135 },
      bestFor: "Chronic muscle tension & knots",
      keyBenefits: ["Muscle Recovery", "Firm Pressure", "Tension Release"],
      category: 'Standard'
    },
    {
      id: "thai-massage-no-oil",
      name: "Thai Massage without oil",
      description: "The authentic \"dry\" Thai massage. This treatment focuses on acupressure and passive yoga-like stretching to open the body's energy lines and improve flexibility. No oil is used, and you will feel lighter and more aligned.",
      fullPrice: 95,
      depositAmount: 30,
      duration: 60,
      image: SERVICE_CARD_IMAGE_URL,
      rates: { "30": 65, "45": 80, "60": 95, "90": 135 },
      bestFor: "Flexibility & traditional alignment",
      keyBenefits: ["Improved Flexibility", "Traditional Techniques", "Non-Greasy"],
      category: 'Standard'
    },
    {
      id: "accredited-oil",
      name: "Treatment by accredited therapist with oil massage (HICAPS)",
      description: "A clinical approach to massage therapy performed by a certified professional. This treatment focuses on addressing specific physical issues, such as neck and shoulder pain or posture-related stiffness, using therapeutic oils for a smooth, effective session.",
      fullPrice: 100,
      depositAmount: 40,
      duration: 60,
      image: SERVICE_CARD_IMAGE_URL,
      rates: { "30": 70, "60": 100, "90": 150, "120": 200 },
      bestFor: "Specific",
      keyBenefits: ["Professional Therapy", "Targeted Healing", "Certified Care"],
      category: 'Remedial'
    },
    {
      id: "accredited-deep-tissue",
      name: "Treatment deep tissue by accredited therapist (HICAPS)",
      description: "(Our Signature Therapeutic Session) The highest level of clinical care. Our accredited therapists use deep tissue techniques to manage severe muscle tightness and structural imbalances, ensuring the most effective and comfortable deep-pressure experience.",
      fullPrice: 105,
      depositAmount: 40,
      duration: 60,
      image: "https://euiwkvozrhnbxttfuchh.supabase.co/storage/v1/object/public/mira-assets/Mira%20web/service%20cards/backThai%20Deep%20Tissue.png",
      rates: { "30": 75, "60": 105, "90": 155, "120": 205 },
      bestFor: "Severe muscle tightness & structural imbalances",
      keyBenefits: ["Maximum Pain Relief", "Clinical Expertise", "Deep Muscle Alignment"],
      category: 'Remedial',
      is_my_pick: true
    }
  ] as Service[],
  staff: [
    {
      id: "therapist-male",
      name: "Male Therapist",
      role: "Professional Therapist",
      avatar: SERVICE_CARD_IMAGE_URL,
      specialties: ["Thai Traditional", "Deep Tissue", "Remedial"],
      status: 'Working',
      isAccredited: true,
      providerNumber: "PRV-M-12345"
    },
    {
      id: "therapist-female",
      name: "Female Therapist",
      role: "Professional Therapist",
      avatar: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=200&q=80",
      specialties: ["Thai Traditional", "Relaxation", "Remedial"],
      status: 'Working',
      isAccredited: true,
      providerNumber: "PRV-F-67890"
    }
  ] as Staff[],
  holidays: [
    {
      id: 'songkran-2026',
      startDate: '2026-04-13',
      endDate: '2026-04-15',
      message: 'Happy Songkran! We are closed for the Thai New Year festival.',
      type: 'holiday',
      isActive: true
    },
    {
      id: 'christmas-2026',
      startDate: '2026-12-25',
      endDate: '2026-12-26',
      message: 'Merry Christmas! We are closed for the holidays.',
      type: 'holiday',
      isActive: true
    }
  ] as Holiday[]
};
