import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-[#5a0303] text-white py-1.5 px-4 flex flex-col md:flex-row items-center justify-between gap-2 relative z-50 text-sm">
      {/* News section */}
      <div className="flex-1 w-full max-w-4xl flex items-center bg-black/20 rounded-full py-1 overflow-hidden relative">
        <span className="font-bold text-yellow whitespace-nowrap px-4 z-10 bg-[#5a0303] shadow-[10px_0_10px_#5a0303]">LATEST NEWS</span>
        <div className="flex-1 overflow-hidden relative h-5 flex items-center">
            <div className="animate-marquee whitespace-nowrap font-poppins text-xs md:text-sm text-gray-200 min-w-full">
              Welcome to Masum Vastu Guru — Transform your life with authentic Vastu Shastra. &nbsp; | &nbsp; Book your personalized consultation today! &nbsp; | &nbsp; Enroll in our professional certification courses.
            </div>
        </div>
      </div>

      {/* Social & Contact */}
      <div className="flex items-center gap-4 shrink-0 mt-1 md:mt-0 pb-1 md:pb-0">
        <div className="hidden lg:flex items-center gap-4 border-r border-white/20 pr-4 text-gray-300 font-poppins text-xs">
          <a href="#" className="hover:text-yellow transition-colors flex items-center gap-1"><Phone size={14} /> +91 99999 99999</a>
          <a href="#" className="hover:text-yellow transition-colors flex items-center gap-1"><Mail size={14} /> info@masumvastuguru.com</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow hover:text-maroon transition-all"><Facebook size={12} /></a>
          <a href="#" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow hover:text-maroon transition-all"><Instagram size={12} /></a>
          <a href="#" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow hover:text-maroon transition-all"><Youtube size={12} /></a>
          <a href="#" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow hover:text-maroon transition-all"><Linkedin size={12} /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
