import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


const Icon = ({ name, className = '' }) => {
  const icons = {
    search: '🔍',
    code: '💻',
    skill: '⚡',
    project: '🚀',
    work: '💼',
    education: '🎓',
    email: '📧',
    github: '🐱',
    linkedin: '💼',
    portfolio: '🌐',
    link: '🔗',
    star: '⭐',
    trophy: '🏆'
  };
  
  return <span className={className}>{icons[name] || '📄'}</span>;
};

function App() {
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchTopSkills();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/profile?t=${Date.now()}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills/top`);
      setTopSkills(response.data);
    } catch (error) {
      console.error('Error fetching top skills:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    try {
      setSearchLoading(true);
      const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const filterProjectsBySkill = async () => {
    if (!skillFilter) {
      setFilteredProjects(null);
      return;
    }
    
    try {
      const response = await axios.get(`${API_BASE_URL}/projects?skill=${encodeURIComponent(skillFilter)}`);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Error filtering projects:', error);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="hero-header">
        <h1>Govind Singh</h1>
        <p>Full Stack Developer & Problem Solver</p>
        <div className="hero-badge">
          <Icon name="code" /> Crafting digital experiences with code
        </div>
      </header>

      <div className="section-card">
        <h2 className="section-title"><Icon name="education" /> Profile</h2>
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar">GS</div>
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p><strong><Icon name="email" /> Email:</strong> {profile.email}</p>
            <p><strong><Icon name="education" /> Education:</strong> {profile.education}</p>
            
            <h3><Icon name="skill" /> Skills</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Frontend</h4>
                <div className="skills-list">
                  {profile.skills && profile.skills.filter(skill => 
                    ['JavaScript', 'React', 'HTML', 'CSS'].includes(skill.skill)
                  ).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.skill} <Icon name="star" />{skill.proficiency}/5
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Backend</h4>
                <div className="skills-list">
                  {profile.skills && profile.skills.filter(skill => 
                    ['Node.js', 'Express', 'Python', 'SQL'].includes(skill.skill)
                  ).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.skill} <Icon name="star" />{skill.proficiency}/5
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <h3><Icon name="link" /> Connect With Me</h3>
            <div className="profile-links">
              {profile.links && profile.links.github && (
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="profile-link github">
                  <Icon name="github" /> GitHub
                </a>
              )}
              {profile.links && profile.links.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link linkedin">
                  <Icon name="linkedin" /> LinkedIn
                </a>
              )}
              {profile.links && profile.links.portfolio && (
                <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="profile-link portfolio">
                  <Icon name="portfolio" /> Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title"><Icon name="search" /> Explore My Portfolio</h2>
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search across my skills, projects, and experience..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleSearch)}
              className="search-input"
            />
            <button onClick={handleSearch} disabled={searchLoading} className="search-button">
              <Icon name="search" /> {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Filter projects by specific skill..."
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, filterProjectsBySkill)}
              className="search-input"
            />
            <button onClick={filterProjectsBySkill} className="search-button">
              <Icon name="code" /> Filter Projects
            </button>
            {skillFilter && (
              <button onClick={() => {
                setSkillFilter('');
                setFilteredProjects(null);
              }} className="search-button" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'}}>
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {searchLoading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Searching through my portfolio...</p>
          </div>
        )}

        {searchResults && !searchLoading && (
          <div className="search-results">
            <h3>Search Results for "{searchTerm}"</h3>
            {/* Search results content remains the same */}
          </div>
        )}
      </div>

      <div className="section-card">
        <h2 className="section-title"><Icon name="project" /> Projects</h2>
        <div className="projects-grid">
          {(filteredProjects || profile.projects || []).map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.links && (
                <div className="project-links">
                  {JSON.parse(project.links).map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Icon name="link" /> {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title"><Icon name="trophy" /> Top Skills</h2>
        <div className="skills-progress">
          {topSkills.map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="skill-name">{skill.skill}</span>
              <div className="proficiency-bar">
                <div 
                  className="proficiency-fill" 
                  style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                ></div>
              </div>
              <span className="proficiency-text">{skill.proficiency}/5</span>
            </div>
          ))}
        </div>
      </div>

      {profile.work && profile.work.length > 0 && (
        <div className="section-card">
          <h2 className="section-title"><Icon name="work" /> Experience</h2>
          <div className="projects-grid">
            {profile.work.map(job => (
              <div key={job.id} className="project-card">
                <h3>{job.position} at {job.company}</h3>
                <p className="text-sm text-gray-600 mb-2">{job.duration}</p>
                <p>{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;