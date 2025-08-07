'use client';

export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="skills-grid">
          <div className="skill-item">
            <div>
              <strong>Portfolio Website</strong>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>
                A personal website to showcase my projects and skills.
              </p>
            </div>
          </div>
          <div className="skill-item">
            <div>
              <strong>Todo App</strong>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>
                Built with React and Firebase for real-time syncing.
              </p>
            </div>
          </div>
          <div className="skill-item">
            <div>
              <strong>Weather App</strong>
              <p style={{ fontSize: '12px', marginTop: '5px' }}>
                A responsive weather app using OpenWeatherMap API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
