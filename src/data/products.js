import ruby from '../assets/Ruby(manikya).jpeg';
import emerald from '../assets/Emerald.jpeg';
import blueSapphire from '../assets/Blue-sapphire (neelam).jpeg';
import yellowSapphire from '../assets/yellow sapphire (pukhraj).jpeg';
import diamond1 from '../assets/WhatsApp Image 2026-04-18 at 7.31.22 AM.jpeg';
import diamond2 from '../assets/WhatsApp Image 2026-04-18 at 7.31.22 AM (1).jpeg';
import pearl from '../assets/Pearl (moti).jpeg';
import coral from '../assets/coral (moonga).jpeg';
import hessonite from '../assets/Hessonite gamet (gomedh).jpeg';
import catsEye from '../assets/Ketu (cat eye).jpeg';
import ekMukhi from '../assets/EK mukhi rudraksha.jpeg';
import fiveMukhi from '../assets/5 mukhi rudraksha.jpeg';

export const products = [
  {
    id: 1, name: "Premium Ruby (Manikya)", category: "Gemstones", price: 4999, originalPrice: 6999, discount: 29,
    rating: 4.8, reviewCount: 124, inStock: true, isBestseller: true, isFeatured: true,
    images: [ruby],
    description: "Natural certified Ruby gemstone for enhancing leadership, confidence, and vitality. Energized with Vedic mantras for maximum astrological benefit.",
    benefits: ["Boosts confidence and leadership qualities", "Strengthens Sun in horoscope", "Enhances vitality and courage", "Promotes success in career"],
    usage: "Wear on the ring finger of the right hand in gold or copper setting on a Sunday morning during Shukla Paksha.",
    sku: "GEM-RUBY-001", freeShipping: true
  },
  {
    id: 2, name: "Premium Emerald (Panna)", category: "Gemstones", price: 6499, originalPrice: 8999, discount: 28,
    rating: 4.7, reviewCount: 98, inStock: true, isBestseller: false, isFeatured: true,
    images: [emerald],
    description: "Premium quality Emerald for Mercury. Improves intellect, communication, and business acumen.",
    benefits: ["Enhances intellect and memory", "Improves communication skills", "Good for business and trade", "Strengthens Mercury planet"],
    usage: "Wear on the little finger in gold setting on Wednesday morning after energizing with mantras.",
    sku: "GEM-EMR-002", freeShipping: true
  },
  {
    id: 3, name: "Royal Blue Sapphire (Neelam)", category: "Gemstones", price: 8999, originalPrice: 12999, discount: 31,
    rating: 4.9, reviewCount: 156, inStock: true, isBestseller: true, isFeatured: true,
    images: [blueSapphire],
    description: "Certified Blue Sapphire for Saturn. Provides rapid results in career, wealth, and protection from negative energies.",
    benefits: ["Fast-acting for wealth and prosperity", "Protection from Saturn's malefic effects", "Career advancement", "Mental clarity and focus"],
    usage: "Test for 3 days before wearing. Set in silver or iron and wear on middle finger on Saturday.",
    sku: "GEM-SAP-003", freeShipping: true
  },
  {
    id: 4, name: "Yellow Sapphire (Pukhraj)", category: "Gemstones", price: 7499, originalPrice: 10499, discount: 29,
    rating: 4.8, reviewCount: 89, inStock: true, isBestseller: false, isFeatured: true,
    images: [yellowSapphire],
    description: "Certified Yellow Sapphire for Jupiter. Represents wisdom, wealth, and professional success.",
    benefits: ["Brings wealth and prosperity", "Enhances wisdom and knowledge", "Good for marriage and childbirth", "Strengthens Jupiter planet"],
    usage: "Wear on the index finger of the right hand in gold setting on Thursday morning.",
    sku: "GEM-YLS-004", freeShipping: true
  },
  {
    id: 5, name: "Premium Diamond (Heera)", category: "Gemstones", price: 14999, originalPrice: 19999, discount: 25,
    rating: 4.9, reviewCount: 42, inStock: true, isBestseller: true, isFeatured: true,
    images: [diamond1, diamond2],
    description: "Certified natural Diamond for Venus. Symbolizes luxury, beauty, and success. Expertly energized.",
    benefits: ["Attracts luxury and comforts", "Strengthens Venus for relationship harmony", "Enhances creativity", "Brings fame and status"],
    usage: "Wear on the middle or little finger in white gold or silver on Friday morning.",
    sku: "GEM-DIA-005", freeShipping: true
  },
  {
    id: 6, name: "Natural Pearl (Moti)", category: "Gemstones", price: 2499, originalPrice: 3499, discount: 29,
    rating: 4.6, reviewCount: 76, inStock: true, isBestseller: false, isFeatured: false,
    images: [pearl],
    description: "Natural Pearl for Moon. Brings emotional stability, peace of mind, and mental clarity.",
    benefits: ["Balances emotions", "Reduces stress and anxiety", "Enhances mental peace", "Good for sleep disorders"],
    usage: "Wear on the little finger in silver setting on Monday morning.",
    sku: "GEM-PRL-006", freeShipping: true
  },
  {
    id: 7, name: "Red Coral (Moonga)", category: "Gemstones", price: 3499, originalPrice: 4999, discount: 30,
    rating: 4.7, reviewCount: 65, inStock: true, isBestseller: false, isFeatured: false,
    images: [coral],
    description: "Natural Red Coral for Mars. Increases physical energy, courage, and vitality.",
    benefits: ["Boosts courage and willpower", "Overcomes obstacles and enemies", "Improves blood circulation", "Strengthens Mars planet"],
    usage: "Wear on the ring finger in copper or gold on Tuesday morning.",
    sku: "GEM-CRL-007", freeShipping: true
  },
  {
    id: 8, name: "Hessonite Garnet (Gomedh)", category: "Gemstones", price: 3999, originalPrice: 5999, discount: 33,
    rating: 4.5, reviewCount: 54, inStock: true, isBestseller: false, isFeatured: false,
    images: [hessonite],
    description: "Certified Hessonite for Rahu. Provides protection from hidden enemies and success in business.",
    benefits: ["Protects from negative energies", "Success in law and politics", "Clears mental confusion", "Removes Rahu dosha"],
    usage: "Wear on the middle finger in silver setting on Saturday evening.",
    sku: "GEM-HES-008", freeShipping: true
  },
  {
    id: 9, name: "Cat's Eye (Lehsuniya)", category: "Gemstones", price: 3999, originalPrice: 5999, discount: 33,
    rating: 4.6, reviewCount: 48, inStock: true, isBestseller: false, isFeatured: false,
    images: [catsEye],
    description: "Certified Cat's Eye for Ketu. Promotes spiritual growth, intuition, and professional stability.",
    benefits: ["Enhances spiritual awareness", "Protects from hidden enemies", "Improves intuition", "Removes Ketu dosha"],
    usage: "Wear on the middle or little finger in silver on Tuesday evening.",
    sku: "GEM-CAT-009", freeShipping: true
  },
  {
    id: 10, name: "Ek Mukhi Rudraksha", category: "Rudraksha", price: 5999, originalPrice: 8999, discount: 33,
    rating: 4.9, reviewCount: 32, inStock: true, isBestseller: true, isFeatured: true,
    images: [ekMukhi],
    description: "Rare Ek Mukhi Rudraksha symbolizing Lord Shiva. Brings ultimate focus, power, and self-realization.",
    benefits: ["Enhances focus and meditation", "Brings power and authority", "Removes negative karma", "Connects to divine consciousness"],
    usage: "Wear around the neck in silver or silk thread on Monday morning.",
    sku: "RDK-EKM-010", freeShipping: true
  },
  {
    id: 11, name: "5 Mukhi Rudraksha Mala", category: "Rudraksha", price: 1499, originalPrice: 2199, discount: 32,
    rating: 4.9, reviewCount: 312, inStock: true, isBestseller: true, isFeatured: true,
    images: [fiveMukhi],
    description: "Original 5 Mukhi Rudraksha from Nepal. Excellent for general health and mental peace.",
    benefits: ["Reduces blood pressure and stress", "Enhances mental clarity", "Spiritual growth", "General wellbeing"],
    usage: "Wear around the neck or use for japa meditation.",
    sku: "RDK-5MK-011", freeShipping: true
  }
];

export const categories = [
  "Gemstones", "Bracelets", "Crystals", "Rudraksha",
  "Vastu Materials", "Herbs", "Yantra", "Feng Shui"
];
