import { useRef, useEffect, useState } from 'react';
import ProcessCube from '@/components/ui/ProcessCube';

const ProcessSection = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = [
    {
      number: '01',
      title: 'Briefing do projeto',
      description: 'Reuniões iniciais para compreender as necessidades do cliente, objetivos do projeto e requisitos técnicos fundamentais.',
      image: 'https://i.imgur.com/WBPCAx2.png'
    },
    {
      number: '02',
      title: 'Lançamento estrutural',
      description: 'Desenvolvimento da concepção estrutural com definição de sistemas construtivos, dimensionamento preliminar e análise de cargas.',
      image: 'https://i.imgur.com/jvb23r8.png'
    },
    {
      number: '03',
      title: 'Lançamento de instalações',
      description: 'Elaboração dos projetos de instalações elétricas e hidrossanitárias com definição de pontos, prumadas e sistemas.',
      image: 'https://i.imgur.com/E3maufk.png'
    },
    {
      number: '04',
      title: 'Compatibilização de disciplinas',
      description: 'Integração completa entre arquitetura, estrutural e instalações hidrossanitárias e elétricas para evitar interferências.',
      image: 'https://i.imgur.com/QoVjmMI.png'
    },
    {
      number: '05',
      title: 'Detalhamento final e entrega',
      description: 'Refinamento de todos os detalhes executivos, documentação técnica completa e entrega dos projetos aprovados.',
      image: 'https://i.imgur.com/lWaT7vf.png'
    }
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          ticking = false;
          return;
        }

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Verifica se a seção está visível na tela
        const isInView = rect.top <= 0 && rect.bottom >= windowHeight;

        if (isInView) {
          // Calcula o progresso baseado na posição da seção
          const scrollProgress = Math.abs(rect.top) / (rect.height - windowHeight);
          const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

          // Calcula qual card deve estar ativo
          const totalSteps = steps.length;
          const stepProgress = clampedProgress * totalSteps;
          const newIndex = Math.floor(stepProgress);
          const clampedIndex = Math.min(newIndex, totalSteps - 1);

          if (clampedIndex !== currentIndex && !isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(clampedIndex);

            setTimeout(() => {
              setIsTransitioning(false);
            }, 600);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex, isTransitioning, steps.length]);

  const handleProgressClick = (index) => {
    if (index === currentIndex || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    // Scroll para mostrar a seção se não estiver visível
    const container = containerRef.current;
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-black"
    >
      {/* Container sticky */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-4 md:py-8">

        {/* Header com espaçamento adequado */}
        <div className="text-center mb-6 md:mb-12 px-4 md:px-8 pt-2 md:pt-4">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-6">
            Nosso <span className="engineering-text-gradient">Processo</span>
          </h2>
          <p className="text-sm md:text-lg lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Da concepção à execução, um fluxo de trabalho preciso e transparente que garante excelência em cada etapa.
          </p>
        </div>

        {/* Container dos slides horizontais */}
        <div className="relative flex-1 flex items-center">
          <div
            className={`flex transition-all duration-700 ease-out w-full ${isTransitioning ? 'opacity-30 scale-95' : 'opacity-100 scale-100'
              }`}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`w-full flex-shrink-0 px-3 md:px-8 lg:px-16 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-60'
                  }`}
                style={{ minWidth: '100%' }}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-center">

                    {/* Cubo 3D moderno */}
                    <div className="flex justify-center lg:justify-end order-2 lg:order-1 items-center pt-12 pb-8 lg:py-0">
                      <div className="relative flex items-center justify-center">
                        <ProcessCube stepNumber={step.number} />
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="text-white space-y-3 md:space-y-6 lg:pl-12 order-1 lg:order-2 text-center lg:text-left">
                      <div className="text-white/60 font-semibold text-xs md:text-base lg:text-lg tracking-wider uppercase">
                        Etapa {step.number}
                      </div>

                      <h3 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white">
                        {step.title}
                      </h3>

                      <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de progresso */}
        <div className="flex justify-center mt-4 md:mt-8 pb-2 md:pb-4">
          <div className="flex space-x-2 md:space-x-4 bg-black/40 backdrop-blur-sm px-4 md:px-8 py-2 md:py-4 rounded-full border border-white/10">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleProgressClick(index)}
                className={`w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-white w-6 md:w-10 shadow-lg'
                    : 'bg-white/30 hover:bg-white/50'
                  }`}
                title={`Etapa ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;