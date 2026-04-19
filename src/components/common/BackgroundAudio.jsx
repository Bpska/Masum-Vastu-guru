import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import audioFile from '../../assets/background-audio.mpeg';

const BackgroundAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef(null);

  // Attempt to auto-play when the component mounts
  // Note: Modern browsers usually block autoplay unless the user has interacted with the document
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5; // Set volume to 50%
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.log("Autoplay prevented by browser. User interaction required.");
      }
    };

    // We can try to listen for the first user interaction to start playing if autoplay failed
    const handleFirstInteraction = async () => {
      try {
        if (audioRef.current && !isPlaying) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
        // Remove the listeners once played
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
        window.removeEventListener('scroll', handleFirstInteraction);
      } catch (e) {
        // Ignore
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);

    playAudio();

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error("Error playing audio", err);
        });
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioFile} loop />
      
      <div 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] flex items-center gap-2"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-maroon/20 whitespace-nowrap overflow-hidden flex items-center justify-center mr-2"
            >
              <span className="text-xs font-poppins font-semibold text-maroon pr-2">
                {isPlaying ? 'Playing Mantra' : 'Mantra Paused'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 transition-colors duration-300 ${
            isPlaying 
              ? 'bg-maroon border-yellow text-white shadow-maroon/30 animate-[pulse_3s_infinite]' 
              : 'bg-white border-maroon text-maroon'
          }`}
          title={isPlaying ? "Pause Mantra" : "Play Mantra"}
        >
          {isPlaying ? (
            <Volume2 size={24} />
          ) : (
            <VolumeX size={24} />
          )}
          
          {isPlaying && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-yellow rounded-full animate-ping"></span>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default BackgroundAudio;
