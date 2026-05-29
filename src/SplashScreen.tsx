import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import wairaLogo from '../assets/WAIRA APP_1 png.png';

interface SplashScreenProps {
  onFinish: () => void;
}

const PHRASES = ['Viaja', 'Descubre', 'Sueña'];

// Rutas SVG que se "dibujan" alrededor del logo (estilo Sol de los Pastos)
const SVG_PATHS: { d: string; sw: number; len: number }[] = [
  { d: 'M 100 10 A 90 90 0 1 1 99.99 10', sw: 1.2, len: 566 },   // círculo exterior
  { d: 'M 100 45 A 55 55 0 1 1 99.99 45', sw: 1.0, len: 346 },   // círculo interior
  { d: 'M 100 10 L 100 0',                sw: 2.2, len: 11 },     // rayo N
  { d: 'M 163 37 L 171 29',              sw: 2.2, len: 12 },     // rayo NE
  { d: 'M 190 100 L 200 100',            sw: 2.2, len: 11 },     // rayo E
  { d: 'M 163 163 L 171 171',            sw: 2.2, len: 12 },     // rayo SE
  { d: 'M 100 190 L 100 200',            sw: 2.2, len: 11 },     // rayo S
  { d: 'M 37 163 L 29 171',             sw: 2.2, len: 12 },     // rayo SW
  { d: 'M 10 100 L 0 100',              sw: 2.2, len: 11 },     // rayo O
  { d: 'M 37 37 L 29 29',               sw: 2.2, len: 12 },     // rayo NO
];

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'words' | 'tagline' | 'exit'>('logo');
  const [wordIndex, setWordIndex] = useState(-1);
  const [showTagline, setShowTagline] = useState(false);

  // Secuencia principal
  useEffect(() => {
    // Fase 1: logo se dibuja (1.2s)
    const t1 = setTimeout(() => {
      setPhase('words');
      setWordIndex(0);
    }, 1200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'words' || wordIndex < 0) return;
    if (wordIndex < PHRASES.length - 1) {
      const t = setTimeout(() => setWordIndex(i => i + 1), 720);
      return () => clearTimeout(t);
    } else {
      // Última palabra mostrada → mostrar tagline
      const t = setTimeout(() => {
        setPhase('tagline');
        setShowTagline(true);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase, wordIndex]);

  useEffect(() => {
    if (phase !== 'tagline') return;
    const t = setTimeout(() => {
      setPhase('exit');
      setTimeout(onFinish, 750);
    }, 1900);
    return () => clearTimeout(t);
  }, [phase, onFinish]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="wayra-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at 60% 30%, #78350f 0%, #451a03 55%, #1c0900 100%)',
          }}
        >
          {/* Patrón de puntos sutil */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(251,191,36,0.07) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Anillos pulsantes */}
          {[170, 280, 410].map((size, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                border: '1px solid rgba(251,191,36,0.18)',
              }}
              animate={{ scale: [1, 1.055, 1], opacity: [0.18, 0.5, 0.18] }}
              transition={{ duration: 2.6, delay: i * 0.45, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}

          {/* Logo + SVG trazado */}
          <motion.div
            initial={{ scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: 'relative', zIndex: 10, marginBottom: '1.25rem' }}
          >
            {/* SVG que se dibuja alrededor del logo */}
            <svg
              width="152"
              height="152"
              viewBox="0 0 200 200"
              fill="none"
              style={{ position: 'absolute', top: -12, left: -12, pointerEvents: 'none' }}
            >
              {SVG_PATHS.map((p, i) => (
                <motion.path
                  key={i}
                  d={p.d}
                  stroke="#fbbf24"
                  strokeWidth={p.sw}
                  strokeLinecap="round"
                  fill="none"
                  opacity={i < 2 ? 0.55 : 0.7}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: i < 2 ? 0.85 : 0.35,
                    delay: i < 2 ? i * 0.22 : 0.3 + i * 0.07,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </svg>

            {/* Logo Wayra */}
            <motion.img
              src={wairaLogo}
              alt="Wayra"
              style={{
                width: 128,
                height: 128,
                objectFit: 'contain',
                position: 'relative',
                zIndex: 10,
                filter: 'drop-shadow(0 0 28px rgba(251,191,36,0.55))',
              }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </motion.div>

          {/* Nombre Wayra */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65, ease: 'easeOut' }}
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: '3rem',
              fontWeight: 700,
              color: '#fbbf24',
              margin: '0 0 1.5rem',
              letterSpacing: '-0.02em',
              textShadow: '0 0 40px rgba(251,191,36,0.4)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            Wayra
          </motion.h1>

          {/* Palabras: Viaja · Descubre · Sueña */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '3rem',
              marginBottom: '1.5rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {wordIndex >= 0 &&
                PHRASES.slice(0, wordIndex + 1).map((word, i) => (
                  <React.Fragment key={word}>
                    {i > 0 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          fontFamily: "'Georgia', serif",
                          fontSize: '1.4rem',
                          color: 'rgba(251,191,36,0.5)',
                          fontWeight: 200,
                        }}
                      >
                        ·
                      </motion.span>
                    )}
                    <motion.span
                      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
                      animate={{
                        opacity: i === wordIndex ? 1 : 0.4,
                        y: 0,
                        filter: 'blur(0px)',
                        color: i === wordIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                      }}
                      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontSize: '1.6rem',
                        fontWeight: 400,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {word}
                    </motion.span>
                  </React.Fragment>
                ))}
            </AnimatePresence>
          </div>

          {/* Tagline */}
          <AnimatePresence>
            {showTagline && (
              <motion.p
                key="tagline"
                initial={{ opacity: 0, y: 14, letterSpacing: '0.12em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.42em' }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  fontFamily: 'sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  color: 'rgba(253,230,138,0.65)',
                  margin: 0,
                }}
              >
                mientras las rutas crean el camino
              </motion.p>
            )}
          </AnimatePresence>

          {/* Puntos decorativos en la parte inferior */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            style={{
              position: 'absolute',
              bottom: 36,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {[6, 6, 26, 6, 6].map((w, i) => (
              <motion.div
                key={i}
                style={{ width: w, height: 3, borderRadius: 9999, background: '#f59e0b' }}
                animate={{ opacity: [0.25, 0.9, 0.25] }}
                transition={{ duration: 1.6, delay: i * 0.16, repeat: Infinity }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
