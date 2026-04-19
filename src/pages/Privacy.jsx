import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
      <div className="bg-gradient-to-r from-maroon to-maroon-dark pt-36 md:pt-40 lg:pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/70 font-poppins">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 font-poppins text-text-mid space-y-6">
          <p className="text-lg text-text-dark font-medium">Welcome to Masum Vastu Guru. We respect your privacy and are committed to protecting your personal data.</p>
          
          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect personal data when you interact with us, such as when you book a consultation, purchase a product, or subscribe to our newsletter. This data may include your name, email address, phone number, and physical address.</p>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and manage our Vastu consultancy services.</li>
            <li>To process your orders and deliver products.</li>
            <li>To send you important notifications and marketing updates (if you opted in).</li>
            <li>To improve our website functionality and user experience.</li>
          </ul>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">3. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, or destruction.</p>

          <h2 className="text-xl font-playfair font-bold text-maroon mt-8 mb-4">4. Contact Us</h2>
          <p>If you have any questions or concerns about this privacy policy, please contact us at: <a href="mailto:masumvastuguru@gmail.com" className="text-maroon font-bold hover:underline">masumvastuguru@gmail.com</a></p>
        </div>
      </section>
    </motion.div>
  );
};

export default Privacy;
