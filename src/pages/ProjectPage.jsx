import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import BackButton from '../components/BackButton.jsx';
import Noise from '../components/Noise.jsx';
import Cursor from '../components/Cursor.jsx';
import ProjectSection from '../components/ProjectSections.jsx';
import RichText from '../components/RichText.jsx';
import { getProjectBySlug, getNextProject, getProjectsByGalaxy } from '../data/projects.js';
import '../styles/project.css';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — Moses Markels`;
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const next = getNextProject(slug);
  const siblings = getProjectsByGalaxy(project.galaxy);
  const isLast = siblings.length > 1 && siblings[siblings.length - 1].slug === slug;
  const galleryLink = `/work/${project.galaxy}`;

  return (
    <div className="project-page">
      <Noise />
      <Cursor />

      <Header />
      <BackButton to={galleryLink} />

      <section className="project-hero">
        <img src={project.hero} alt={project.title} />
        <div className="project-hero-content">
          <h1 className="project-hero-title">{project.title}</h1>
          <div className="project-hero-meta">
            {project.tags.map((tag) => (
              <span className="project-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <main className="project-content">
        <div className="project-intro">
          <div className="project-intro-text">
            {project.intro.paragraphs.map((p, i) => (
              <p key={i}><RichText content={p} /></p>
            ))}
          </div>
          <div className="project-intro-details">
            {project.intro.details.map((d) => (
              <div key={d.label}>
                <p className="project-detail-label">{d.label}</p>
                <p>{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        {project.sections.map((section, i) => (
          <ProjectSection section={section} key={i} />
        ))}

        <div className="next-project">
          <div>
            <p className="next-project-label">{isLast ? 'Back to Start' : 'Next Project'}</p>
            <Link to={`/project/${next.slug}`}>
              <p className="next-project-title">{next.title} →</p>
            </Link>
          </div>
          {isLast && (
            <Link to={galleryLink} style={{ fontSize: '.8rem', opacity: 0.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>
              ← All Projects
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
