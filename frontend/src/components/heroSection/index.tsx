import React from 'react';
import { motion } from 'framer-motion';
import style from './index.module.css';
import hopeFund from '../../../public/assets/hopefund.png';

const HeroSection = () => {
  return (
    <div className={style.heroSection}>
      {/* Text Content */}
      <div className={style.textContent}>
        <motion.h1
          className={style.heroTitle}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Empower Hope, One Donation at a Time.
        </motion.h1>

        <motion.p
          className={style.heroDescription}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
        >
          Join us in helping those in need. Your support makes a real difference.
        </motion.p>

        <motion.button
          className={style.heroButton}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          Donate Now
        </motion.button>
      </div>

      {/* Vector Image */}
      <motion.div
        className={style.heroImageWrapper}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <img src={hopeFund} alt="Funding" className={style.heroImage} />
      </motion.div>
    </div>
  );
};

export default HeroSection;
