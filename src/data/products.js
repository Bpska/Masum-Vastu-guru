export const products = [
  {
    id: 1, name: "Ruby Gemstone", category: "Gemstones", price: 4999, originalPrice: 6999, discount: 29,
    rating: 4.8, reviewCount: 124, inStock: true, isBestseller: true, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Natural certified Ruby gemstone for enhancing leadership, confidence, and vitality. Energized with Vedic mantras for maximum astrological benefit.",
    benefits: ["Boosts confidence and leadership qualities", "Strengthens Sun in horoscope", "Enhances vitality and courage", "Promotes success in career"],
    usage: "Wear on the ring finger of the right hand in gold or copper setting on a Sunday morning during Shukla Paksha.",
    sku: "GEM-RUBY-001", freeShipping: true
  },
  {
    id: 2, name: "Emerald Stone", category: "Gemstones", price: 6499, originalPrice: 8999, discount: 28,
    rating: 4.7, reviewCount: 98, inStock: true, isBestseller: false, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Premium quality Emerald (Panna) for Mercury. Improves intellect, communication, and business acumen.",
    benefits: ["Enhances intellect and memory", "Improves communication skills", "Good for business and trade", "Strengthens Mercury planet"],
    usage: "Wear on the little finger in gold setting on Wednesday morning after energizing with mantras.",
    sku: "GEM-EMR-002", freeShipping: true
  },
  {
    id: 3, name: "Blue Sapphire", category: "Gemstones", price: 8999, originalPrice: 12999, discount: 31,
    rating: 4.9, reviewCount: 156, inStock: true, isBestseller: true, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600"],
    description: "Certified Blue Sapphire (Neelam) for Saturn. Provides rapid results in career, wealth, and protection from negative energies.",
    benefits: ["Fast-acting for wealth and prosperity", "Protection from Saturn's malefic effects", "Career advancement", "Mental clarity and focus"],
    usage: "Test for 3 days before wearing. Set in silver or iron and wear on middle finger on Saturday.",
    sku: "GEM-SAP-003", freeShipping: true
  },
  {
    id: 4, name: "Tiger Eye Bracelet", category: "Bracelets", price: 899, originalPrice: 1299, discount: 31,
    rating: 4.6, reviewCount: 210, inStock: true, isBestseller: true, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Natural Tiger Eye crystal bracelet for confidence, protection, and grounding. Perfect for daily wear.",
    benefits: ["Boosts self-confidence", "Protection from negative energy", "Grounding and stability", "Enhances willpower"],
    usage: "Wear on the left wrist daily. Cleanse under moonlight once a month.",
    sku: "BRC-TGR-004", freeShipping: false
  },
  {
    id: 5, name: "Black Obsidian Bracelet", category: "Bracelets", price: 749, originalPrice: 1099, discount: 32,
    rating: 4.5, reviewCount: 178, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Powerful Black Obsidian bracelet for protection against negativity and psychic attacks.",
    benefits: ["Strong psychic protection", "Removes negative energy", "Emotional healing", "Grounding stone"],
    usage: "Wear on the right wrist. Cleanse with sage smoke weekly.",
    sku: "BRC-OBS-005", freeShipping: false
  },
  {
    id: 6, name: "Rose Quartz Bracelet", category: "Bracelets", price: 699, originalPrice: 999, discount: 30,
    rating: 4.7, reviewCount: 245, inStock: true, isBestseller: false, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Gentle Rose Quartz bracelet to attract love, harmony, and emotional healing.",
    benefits: ["Attracts love and romance", "Promotes emotional healing", "Enhances self-love", "Brings harmony in relationships"],
    usage: "Wear on left wrist close to heart. Program with intentions during full moon.",
    sku: "BRC-RSQ-006", freeShipping: false
  },
  {
    id: 7, name: "Amethyst Cluster", category: "Crystals", price: 1299, originalPrice: 1799, discount: 28,
    rating: 4.8, reviewCount: 132, inStock: true, isBestseller: false, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Beautiful natural Amethyst cluster for spiritual growth, meditation, and stress relief.",
    benefits: ["Promotes spiritual awareness", "Excellent for meditation", "Relieves stress and anxiety", "Enhances intuition"],
    usage: "Place in meditation room or bedroom. Cleanse under running water monthly.",
    sku: "CRY-AME-007", freeShipping: true
  },
  {
    id: 8, name: "Clear Quartz Point", category: "Crystals", price: 999, originalPrice: 1399, discount: 29,
    rating: 4.6, reviewCount: 89, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Master healer Clear Quartz point crystal for energy amplification and clarity.",
    benefits: ["Amplifies energy and intentions", "Master healer crystal", "Enhances clarity of thought", "Programmable for any purpose"],
    usage: "Hold during meditation or place at center of crystal grid. Cleanse regularly in sunlight.",
    sku: "CRY-CLQ-008", freeShipping: false
  },
  {
    id: 9, name: "Selenite Wand", category: "Crystals", price: 849, originalPrice: 1199, discount: 29,
    rating: 4.5, reviewCount: 67, inStock: false, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Pure Selenite wand for energy cleansing, aura clearing, and spiritual connection.",
    benefits: ["Cleanses and charges other crystals", "Clears negative energy from spaces", "Enhances spiritual connection", "Promotes peace and calm"],
    usage: "Wave around body for aura cleansing. Never submerge in water. Place near other crystals to charge them.",
    sku: "CRY-SEL-009", freeShipping: false
  },
  {
    id: 10, name: "5 Mukhi Rudraksha Mala", category: "Rudraksha", price: 1499, originalPrice: 2199, discount: 32,
    rating: 4.9, reviewCount: 312, inStock: true, isBestseller: true, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600", "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Certified 108+1 bead Rudraksha mala with original 5 Mukhi beads from Nepal. Blessed and energized.",
    benefits: ["Reduces blood pressure and stress", "Enhances mental clarity", "Spiritual growth and meditation", "General health and wellbeing"],
    usage: "Wear around neck or use for japa meditation. Remove before sleeping and bathing.",
    sku: "RDK-5MK-010", freeShipping: true
  },
  {
    id: 11, name: "Gauri Shankar Rudraksha", category: "Rudraksha", price: 2999, originalPrice: 4499, discount: 33,
    rating: 4.8, reviewCount: 87, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600", "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600"],
    description: "Rare naturally joined Gauri Shankar Rudraksha symbolizing Shiva-Parvati. Excellent for relationships.",
    benefits: ["Strengthens marital bond", "Brings harmony in relationships", "Balances Ida and Pingala nadis", "Unity of Shiva and Shakti energies"],
    usage: "Wear close to heart on Monday. Energize with Om Namah Shivaya mantra.",
    sku: "RDK-GS-011", freeShipping: true
  },
  {
    id: 12, name: "Copper Pyramid", category: "Vastu Materials", price: 1199, originalPrice: 1699, discount: 29,
    rating: 4.7, reviewCount: 145, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Vastu-compliant copper pyramid for energy correction and positive vibrations in home and office.",
    benefits: ["Corrects Vastu doshas", "Generates positive energy", "Enhances meditation experience", "Preserves food and water"],
    usage: "Place at the Brahmasthan (center) of your home or office facing North.",
    sku: "VST-CPP-012", freeShipping: true
  },
  {
    id: 13, name: "Vastu Dosh Nivaran Kit", category: "Vastu Materials", price: 1899, originalPrice: 2799, discount: 32,
    rating: 4.8, reviewCount: 198, inStock: true, isBestseller: true, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Complete Vastu correction kit with pyramid, yantra, crystals, and detailed placement guide.",
    benefits: ["Complete Vastu dosh removal", "Includes placement guide", "Multiple correction tools", "Expert-curated combination"],
    usage: "Follow the included placement guide for each item. Consult our expert for personalized guidance.",
    sku: "VST-KIT-013", freeShipping: true
  },
  {
    id: 14, name: "Ashwagandha Powder 250g", category: "Herbs", price: 599, originalPrice: 849, discount: 30,
    rating: 4.6, reviewCount: 234, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "100% organic Ashwagandha root powder for stress relief, immunity, and vitality.",
    benefits: ["Reduces stress and anxiety", "Boosts immunity", "Improves stamina and vitality", "Natural adaptogen"],
    usage: "Mix 1 teaspoon in warm milk before bedtime. Can also be added to smoothies.",
    sku: "HRB-ASH-014", freeShipping: false
  },
  {
    id: 15, name: "Sacred Herb Bundle", category: "Herbs", price: 799, originalPrice: 1199, discount: 33,
    rating: 4.5, reviewCount: 89, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Curated bundle of sacred herbs including sage, camphor, and guggul for space purification.",
    benefits: ["Purifies living spaces", "Removes negative energies", "Creates sacred atmosphere", "Traditional Vedic purification"],
    usage: "Light the herb bundle and let the smoke purify each room. Best done during sunrise or sunset.",
    sku: "HRB-BDL-015", freeShipping: false
  },
  {
    id: 16, name: "Shree Yantra Gold Plated", category: "Yantra", price: 2499, originalPrice: 3499, discount: 29,
    rating: 4.9, reviewCount: 267, inStock: true, isBestseller: true, isFeatured: true,
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Energized Gold-plated Shree Yantra for wealth, prosperity, and spiritual growth. Handcrafted with precision.",
    benefits: ["Attracts wealth and abundance", "Removes financial obstacles", "Enhances spiritual energy", "Creates positive vibrations"],
    usage: "Place in prayer room or office facing East or North. Offer flowers and incense daily.",
    sku: "YNT-SHR-016", freeShipping: true
  },
  {
    id: 17, name: "Kuber Yantra", category: "Yantra", price: 1799, originalPrice: 2499, discount: 28,
    rating: 4.7, reviewCount: 156, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Blessed Kuber Yantra for attracting wealth and financial stability. Copper with gold plating.",
    benefits: ["Blesses with wealth and riches", "Removes financial blockages", "Protects existing wealth", "Enhances business success"],
    usage: "Install in the North direction of home or office. Worship on Thursdays and during Diwali.",
    sku: "YNT-KBR-017", freeShipping: true
  },
  {
    id: 18, name: "Lucky Bamboo Plant", category: "Feng Shui", price: 449, originalPrice: 649, discount: 31,
    rating: 4.4, reviewCount: 312, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Three-layer Lucky Bamboo plant in decorative ceramic pot for good luck and prosperity.",
    benefits: ["Brings good fortune", "Purifies indoor air", "Low maintenance plant", "Enhances positive chi"],
    usage: "Place in East or Southeast direction. Keep in indirect sunlight. Change water weekly.",
    sku: "FNG-BAM-018", freeShipping: false
  },
  {
    id: 19, name: "Metal Wind Chime", category: "Feng Shui", price: 699, originalPrice: 999, discount: 30,
    rating: 4.5, reviewCount: 178, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "6-rod metal wind chime for dispersing negative energy and attracting positive vibrations.",
    benefits: ["Disperses negative energy", "Creates soothing sounds", "Enhances positive vibrations", "Feng Shui cure for bad energy"],
    usage: "Hang at main entrance or in Northwest direction. Avoid hanging directly above head or bed.",
    sku: "FNG-WND-019", freeShipping: false
  },
  {
    id: 20, name: "Crystal Tortoise", category: "Feng Shui", price: 1299, originalPrice: 1899, discount: 32,
    rating: 4.6, reviewCount: 134, inStock: true, isBestseller: false, isFeatured: false,
    images: ["https://images.unsplash.com/photo-1576022158563-24b1b59e4beb?w=600", "https://images.unsplash.com/photo-1599707367812-045c0580e880?w=600", "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=600", "https://images.unsplash.com/photo-1583937443566-6537a4130e45?w=600"],
    description: "Clear crystal tortoise figurine for longevity, protection, and career growth. Vastu and Feng Shui approved.",
    benefits: ["Promotes longevity and health", "Career growth and stability", "Protection from negative influences", "Brings peace and harmony"],
    usage: "Place in North or North-West direction of home or office. Keep on a metal plate.",
    sku: "FNG-TRT-020", freeShipping: true
  }
];

export const categories = [
  "Gemstones", "Bracelets", "Crystals", "Rudraksha",
  "Vastu Materials", "Herbs", "Yantra", "Feng Shui"
];
