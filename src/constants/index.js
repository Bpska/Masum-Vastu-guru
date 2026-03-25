const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export const WA = {
  general: () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I need help with Vastu.")}`,
  order: (items, total, name, phone, address) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`🛒 *NEW ORDER*\n\n📦 *Items:*\n${items.map(i => `• ${i.name} × ${i.qty} = ₹${i.price * i.qty}`).join("\n")}\n\n💰 *Total: ₹${total}*\n👤 Name: ${name}\n📱 Phone: ${phone}\n📍 Address: ${address}\n\nPlease confirm availability and payment.`)}`,
  booking: (service, name, phone, date, time, address) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`📅 *CONSULTATION BOOKING*\n\n🔹 Service: ${service}\n👤 Name: ${name}\n📱 Phone: ${phone}\n📆 Date: ${date}\n🕐 Time: ${time}\n📍 Address: ${address}\n\nPlease confirm my booking.`)}`,
  course: (course, name, phone) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`📚 *COURSE ENROLLMENT*\n\n📖 Course: ${course}\n👤 Name: ${name}\n📱 Phone: ${phone}\n\nPlease share payment details.`)}`,
};

export const SITE = {
  phone: "+91 XXXXXXXXXX",
  email: "info@masumvastuguru.com",
  whatsapp: "+91 XXXXXXXXXX",
  instagram: "https://instagram.com/masumvastuguru",
  facebook: "https://facebook.com/masumvastuguru",
  youtube: "https://youtube.com/@masumvastuguru",
};
