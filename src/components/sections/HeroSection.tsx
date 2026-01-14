import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  const containerRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Controla a escala do conteúdo (1 para 0.8)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Controla a opacidade (1 para 0)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  // Controla o movimento Y do conteúdo
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return <section ref={containerRef} id="hero" className="relative h-[150vh]" // Altura maior para permitir o scroll
  >
    {/* Container sticky com os efeitos */}
    <motion.div style={{
      scale,
      opacity,
      y
    }} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{
        backgroundImage: 'url(https://i.imgur.com/eT1OuIN.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="max-w-4xl mx-auto">
          {/* Logo Icon */}
          <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="mb-8">
            <img src="https://i.imgur.com/H0q0jWu.png" alt="4ME Icon" className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Projetos complementares{' '}
            <span className="engineering-text-gradient">com precisão</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
            Estrutural e fundações, hidrossanitário, elétrico, PPCI, laudos técnicos e assessoria,
            prazos confiáveis e documentação completa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1.0
          }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://wa.me/5547997957480?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-black hover:bg-accent hover:text-white transition-all duration-300 font-bold px-8 py-4 text-lg">
                Fale Conosco
              </Button>
            </a>

            <Link to="projects" smooth={true} duration={500} offset={-80}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-bold px-8 py-4 text-lg">
                Nossos Projetos
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 1.5
        }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Link to="about" smooth={true} duration={500} offset={-80} className="cursor-pointer">

          </Link>
        </motion.div>
      </div>
    </motion.div>
  </section>;
};
export default HeroSection;