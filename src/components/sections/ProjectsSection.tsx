import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionCTA from '@/components/ui/SectionCTA';
import { MapPin, CheckCircle } from 'lucide-react';

const projects = [
  {
    id: 1,
    image: 'https://i.imgur.com/ffMUVEC.jpeg',
    location: 'Condomínio Haras Rio do Ouro, Balneário Camboriú/SC',
    services: ['Estrutural', 'Hidrossanitário', 'Elétrico', 'Acompanhamento de obras']
  },
  {
    id: 2,
    image: 'https://i.imgur.com/v8qcSvW.jpeg',
    location: 'Condomínio Green Ocean, Balneário Camboriú/SC',
    services: ['Estrutural', 'Hidrossanitário', 'Elétrico']
  },
  {
    id: 3,
    image: 'https://i.imgur.com/OUdBSus.jpeg',
    location: 'Condomínio Green Ocean, Balneário Camboriú/SC',
    services: ['Estrutural', 'Hidrossanitário', 'Elétrico']
  },
  {
    id: 4,
    image: 'https://i.imgur.com/xljyttZ.jpeg',
    location: 'Brusque/SC',
    services: ['Estrutural', 'Hidrossanitário', 'Elétrico']
  },
  {
    id: 5,
    image: 'https://i.imgur.com/fhU3Bvk.jpeg',
    location: 'Balneário Camboriú/SC',
    services: ['Preventivo contra incêndio', 'Elétrico', 'Assessoria de aprovações']
  },
  {
    id: 6,
    image: 'https://i.imgur.com/FTsu3V8.jpeg',
    location: 'Condomínio Bella Vista Residence Club, Balneário Camboriú/SC',
    services: ['Estrutural', 'Hidrossanitário', 'Elétrico', 'Acompanhamento de obras']
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative z-10 py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="projects-section-title font-space-grotesk">
              Portfólio de Projetos
            </h2>
            <p className="font-inter text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore a diversidade e a qualidade dos nossos trabalhos, que transformam visões em realidade.
            </p>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <article className="project-card group">
                {/* Image */}
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={`Projeto em ${project.location}`}
                    className="project-image"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="project-content">
                  {/* Location */}
                  <div className="project-location">
                    <MapPin aria-hidden="true" />
                    <span>{project.location}</span>
                  </div>

                  {/* Label */}
                  <p className="project-label">Projetos elaborados:</p>

                  {/* List */}
                  <ul className="project-list">
                    {project.services.map((service, idx) => (
                      <li key={idx} className="project-item">
                        <CheckCircle aria-hidden="true" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16">
            <SectionCTA
              variant="default"
              title="Vamos criar algo incrível juntos?"
              subtitle="Entre em contato e vamos transformar sua ideia em um projeto real e bem executado"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsSection;