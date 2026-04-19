import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MapPin, Clock, X, Zap } from 'lucide-react';

/* ─── Odisha locations ─── */
const odishaLocations = [
  'Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Berhampur',
  'Sambalpur', 'Balasore', 'Bhadrak', 'Baripada', 'Jeypore',
  'Dhenkanal', 'Koraput', 'Bolangir', 'Kendujhar', 'Angul',
  'Phulbani', 'Rayagada', 'Bargarh', 'Nayagarh', 'Jagatsinghpur',
  'Paradip', 'Jajpur', 'Kendrapara', 'Nabarangapur', 'Sundergarh',
];

/* ─── Products / Services ─── */
const liveOrderItems = [
  { name: 'Vastu Pyramid Set',          type: 'product',  emoji: '🔺' },
  { name: 'Crystal Energy Pack',         type: 'product',  emoji: '💎' },
  { name: 'Home Vastu Consultation',     type: 'service',  emoji: '🏠' },
  { name: 'Yantra Energized Plate',      type: 'product',  emoji: '✨' },
  { name: 'Office Vastu Consultation',   type: 'service',  emoji: '🏢' },
  { name: 'Vastu Dosh Remedy Kit',       type: 'product',  emoji: '🌟' },
  { name: 'Online Vastu Report',         type: 'service',  emoji: '📋' },
  { name: 'Copper Vastu Yantra',         type: 'product',  emoji: '🔶' },
  { name: 'Marriage Vastu Consultation', type: 'service',  emoji: '💍' },
  { name: 'Rudraksha Bracelet',          type: 'product',  emoji: '📿' },
];

const timeLabels = ['just now', '30 sec ago', '1 min ago', '2 min ago', '3 min ago'];

function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function newOrder() {
  return { id: Date.now() + Math.random(), location: rnd(odishaLocations), item: rnd(liveOrderItems), time: rnd(timeLabels) };
}

/* ─── Config ─── */
const SHOW_AFTER_MS   = 45_000; // show first toast after 45 seconds

export default function LiveOrderNotification() {
  const [visible,      setVisible]      = useState(false);
  const [dismissed,    setDismissed]    = useState(false);
  const [panelOpen,    setPanelOpen]    = useState(false);
  const [current,      setCurrent]      = useState(null);
  const [orderCount,   setOrderCount]   = useState(0);
  const [recentOrders, setRecentOrders] = useState(() => Array.from({ length: 6 }, newOrder));

  /* show after 10 s */
  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => {
      const first = newOrder();
      setCurrent(first);
      setRecentOrders(prev => [first, ...prev].slice(0, 8));
      setOrderCount(1);
      setVisible(true);
    }, SHOW_AFTER_MS);
    return () => clearTimeout(t);
  }, [dismissed]);

  /* cycle orders every 45-60 sec once visible */
  useEffect(() => {
    if (!visible || dismissed) return;
    let t;
    const nextOrder = () => {
      const delay = Math.floor(Math.random() * (60000 - 45000 + 1)) + 45000;
      t = setTimeout(() => {
        const o = newOrder();
        setCurrent(o);
        setOrderCount(c => c + 1);
        setRecentOrders(prev => [o, ...prev].slice(0, 8));
        nextOrder();
      }, delay);
    };
    nextOrder();
    return () => clearTimeout(t);
  }, [visible, dismissed]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setPanelOpen(false);
    setDismissed(true);
  }, []);

  return (
    <>
      {/* ══════════════  TOAST  ══════════════ */}
      <AnimatePresence mode="wait">
        {visible && !panelOpen && current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{    opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            style={{ position: 'fixed', bottom: '24px', left: '16px', zIndex: 99999, width: '320px', maxWidth: 'calc(100vw - 32px)' }}
          >
            <div
              onClick={() => setPanelOpen(true)}
              style={{
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 12px 50px rgba(100,0,0,0.18), 0 2px 12px rgba(0,0,0,0.1)',
                border: '1px solid rgba(200,160,0,0.25)',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* pulse bar */}
              <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, #8B0000, #D4A017, #8B0000)',
                backgroundSize: '200% 100%',
                animation: 'liveBarScroll 2s linear infinite',
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 14px 8px 14px' }}>
                {/* emoji icon */}
                <div style={{
                  flexShrink: 0, width: 50, height: 50,
                  background: 'rgba(212,160,23,0.12)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  {current.item.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* live badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{
                      display: 'inline-block', width: 8, height: 8,
                      borderRadius: '50%', background: '#22c55e',
                      boxShadow: '0 0 0 3px rgba(34,197,94,0.3)',
                      animation: 'livePing 1.4s ease-in-out infinite',
                    }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Poppins, sans-serif' }}>
                      Live Order
                    </span>
                  </div>

                  <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {current.item.name}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#8B0000', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      📍 {current.location}, Odisha
                    </span>
                    <span style={{ color: '#ddd' }}>·</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                      🕐 {current.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* view link */}
              <div style={{ padding: '2px 14px 12px 14px' }}>
                <span style={{ fontSize: '11px', color: '#8B0000', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  ⚡ View all live orders →
                </span>
              </div>

              {/* close btn */}
              <button
                onClick={e => { e.stopPropagation(); dismiss(); }}
                style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 24, height: 24, borderRadius: '50%',
                  border: 'none', background: 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3af', fontSize: '14px', lineHeight: 1,
                }}
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════  SIDE PANEL  ══════════════ */}
      <AnimatePresence>
        {panelOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setPanelOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 99998 }}
            />

            {/* drawer */}
            <motion.div
              key="panel"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: '100%', maxWidth: '360px',
                zIndex: 99999, display: 'flex', flexDirection: 'column',
                background: '#fff', boxShadow: '4px 0 40px rgba(0,0,0,0.2)',
              }}
            >
              {/* header */}
              <div style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #5a0000 100%)',
                padding: '20px',
                flexShrink: 0,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                      background: '#4ade80', boxShadow: '0 0 0 4px rgba(74,222,128,0.25)',
                      animation: 'livePing 1.4s ease-in-out infinite',
                    }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Poppins, sans-serif' }}>
                      Live Updates
                    </span>
                  </div>
                  <h3 style={{ margin: 0, color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>
                    Orders Across Odisha
                  </h3>
                  <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: 'Poppins, sans-serif' }}>
                    {orderCount} orders this session
                  </p>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: 'none', background: 'rgba(255,255,255,0.15)',
                    color: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* order list */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#f9fafb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <AnimatePresence initial={false}>
                  {recentOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: 1,  y: 0 }}
                      exit={{   opacity: 0,  height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: '#fff', borderRadius: 14,
                        padding: '14px', border: '1px solid #f3f4f6',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                        display: 'flex', alignItems: 'center', gap: 12,
                      }}
                    >
                      <div style={{
                        width: 44, height: 44, flexShrink: 0,
                        background: 'rgba(212,160,23,0.1)', borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                      }}>
                        {order.item.emoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {order.item.name}
                        </p>
                        <p style={{ margin: '3px 0 0', fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#8B0000', fontWeight: 500 }}>
                          📍 {order.location}, Odisha
                        </p>
                      </div>
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <span style={{
                          display: 'inline-block', padding: '2px 8px', borderRadius: 99,
                          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                          fontFamily: 'Poppins, sans-serif',
                          background: order.item.type === 'service' ? '#eff6ff' : 'rgba(212,160,23,0.15)',
                          color:      order.item.type === 'service' ? '#2563eb' : '#8B0000',
                        }}>
                          {order.item.type}
                        </span>
                        <p style={{ margin: '4px 0 0', fontSize: 10, color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                          {order.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* footer */}
              <div style={{ padding: '14px', borderTop: '1px solid #f3f4f6', background: '#fff', textAlign: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                  🛍️ Real-time orders from across Odisha
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════  KEYFRAMES  ══════════════ */}
      <style>{`
        @keyframes liveBarScroll {
          0%   { background-position: 0%   50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes livePing {
          0%, 100% { box-shadow: 0 0 0 0   rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(34,197,94,0);   }
        }
      `}</style>
    </>
  );
}
