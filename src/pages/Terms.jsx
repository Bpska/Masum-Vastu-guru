import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-36 md:pt-40 lg:pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Terms &amp; Conditions</h1>
          <p className="text-white/70 font-poppins">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 font-poppins text-text-mid space-y-6">
          <p className="text-lg text-text-dark font-medium">Please read these Terms &amp; Conditions carefully before using the Masum Vastu Guru website or services.</p>
          
          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing this website, placing an order, or booking a consultation, you agree to comply with and be bound by these terms.</p>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">2. Services and Consultation</h2>
          <p>Our Vastu consultations provide guidance based on traditional principles. While we strive to offer the best advice, outcomes may vary, and we cannot guarantee specific results. Consultations are non-refundable once the service has been rendered.</p>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">3. E-commerce and Products</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All product orders are currently processed manually via WhatsApp.</li>
            <li>Prices and availability are subject to change without notice.</li>
            <li>We do our best to ensure accurate product representations, but slight variations may occur (especially with natural stones).</li>
          </ul>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">4. Intellectual Property</h2>
          <p>All content on this site, including text, graphics, logos, and images, is the property of Masum Vastu Guru or its content suppliers and is protected by copyright laws.</p>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions regarding these terms, contact us at: <a href="mailto:masumvastuguru@gmail.com" className="text-maroon font-bold hover:underline">masumvastuguru@gmail.com</a></p>
        </div>
      </section>
    </motion.div>
  );
};

export default Terms;
