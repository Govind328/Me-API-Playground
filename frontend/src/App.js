import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Icon components
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

// Safe JSON parsing function
const safeJsonParse = (str, defaultValue = []) => {
  if (!str) return defaultValue;
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('JSON parse error:', error);
    return defaultValue;
  }
};

function App() {
  const [profile, setProfile] = useState({
    name: 'Govind Singh',
    email: 'govindsinghsatwas@gmail.com',
    education: 'Dr. B R Ambedkar National Institute of Technology, Jalandhar (Dec 2021 – June 2025)',
    skills: [
      { skill: 'C++', proficiency: 5 },
      { skill: 'JavaScript', proficiency: 5 },
      { skill: 'SQL', proficiency: 4 },
      { skill: 'HTML', proficiency: 5 },
      { skill: 'CSS', proficiency: 5 },
      { skill: 'React.js', proficiency: 5 },
      { skill: 'Redux', proficiency: 4 },
      { skill: 'Node.js', proficiency: 4 },
      { skill: 'Express.js', proficiency: 4 },
      { skill: 'TailwindCSS', proficiency: 4 },
      { skill: 'MongoDB', proficiency: 4 },
      { skill: 'MySQL', proficiency: 4 },
      { skill: 'Git', proficiency: 5 },
      { skill: 'REST APIs', proficiency: 4 },
      { skill: 'Linux', proficiency: 4 }
    ],
    links: {
      github: 'https://github.com/Govind328',
      linkedin: 'https://www.linkedin.com/in/govind-singh-131806232/',
      portfolio: 'https://bitbridge.netlify.app/'
    },
    projects: [
      {
        id: 1,
        title: 'Bit-Bridge - College Student Community',
        description: 'An online discussion forum for college students to collaborate on coding, placement and semester exam doubts, while also sharing academic resources.',
        links: JSON.stringify([{ name: 'GitHub', url: 'https://github.com/Govind328/bit-bridge' }])
      },
      {
        id: 2,
        title: 'Sumz - AI Web Summarizer',
        description: 'A web application React.js and Redux project that allows users to input website links, harnessing the power of AI to extract and summarize relevant information from webpages.',
        links: JSON.stringify([{ name: 'GitHub', url: 'https://github.com/Govind328/sumz-ai-summarizer' }])
      },
      {
        id: 3,
        title: 'Bank Management System',
        description: 'Developed a Bank Management System in C/C++ with file handling and database design. Created modules for account creation, deposits, withdrawals, balance inquiry.',
        links: JSON.stringify([{ name: 'GitHub', url: 'https://github.com/Govind328/bank-management-system' }])
      }
    ],
    work: [
      {
        id: 1,
        company: 'Software Management Solutions Ltd',
        position: 'Software Engineer Intern',
        duration: 'June 2024 – July 2024',
        description: 'Developed a Bank Management System in C/C++ with file handling and database design. Created modules for account creation, deposits, withdrawals, balance inquiry. Implemented secure login-based authentication with admin privileges.'
      },
      {
        id: 2,
        company: 'NIT Jalandhar',
        position: 'Student Developer & Core Member, Fine Arts Society',
        duration: '2021 – 2025',
        description: 'Worked on academic projects involving Data Structures, Operating Systems, DBMS, and OOP. Core member of Fine Arts Society organizing technical and cultural events.'
      }
    ]
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchTopSkills();
  }, []);

  const fetchTopSkills = async () => {
    try {
      // If API is available, use it; otherwise use local data
      const response = await axios.get(`${API_BASE_URL}/skills/top`);
      setTopSkills(response.data);
    } catch (error) {
      console.error('Error fetching top skills, using local data:', error);
      // Use local skills data as fallback
      setTopSkills([
        { skill: 'C++', proficiency: 5 },
        { skill: 'JavaScript', proficiency: 5 },
        { skill: 'React.js', proficiency: 5 },
        { skill: 'HTML', proficiency: 5 },
        { skill: 'CSS', proficiency: 5 }
      ]);
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
      // Implement local search as fallback
      const localResults = {
        skills: profile.skills.filter(skill => 
          skill.skill.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        projects: profile.projects.filter(project => 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        work: profile.work.filter(job => 
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      };
      setSearchResults(localResults);
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
      console.error('Error filtering projects, using local filter:', error);
      // Implement local filtering as fallback
      const filtered = profile.projects.filter(project => 
        project.title.toLowerCase().includes(skillFilter.toLowerCase()) ||
        project.description.toLowerCase().includes(skillFilter.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="container">
      <header className="hero-header">
        <h1>Govind Singh</h1>
        <p>Full Stack Developer & Problem Solver</p>
        <div className="hero-badge">
          <Icon name="code" /> Knight at LeetCode | 600+ Problems Solved
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
                <h4>Languages</h4>
                <div className="skills-list">
                  {profile.skills.filter(skill => 
                    ['C++', 'JavaScript', 'SQL', 'HTML', 'CSS'].includes(skill.skill)
                  ).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.skill} <Icon name="star" />{skill.proficiency}/5
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Frameworks & Tools</h4>
                <div className="skills-list">
                  {profile.skills.filter(skill => 
                    ['React.js', 'Redux', 'Node.js', 'Express.js', 'TailwindCSS', 'Git', 'REST APIs', 'Linux'].includes(skill.skill)
                  ).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.skill} <Icon name="star" />{skill.proficiency}/5
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-category">
                <h4>Databases</h4>
                <div className="skills-list">
                  {profile.skills.filter(skill => 
                    ['MongoDB', 'MySQL'].includes(skill.skill)
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
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="profile-link github">
                <Icon name="github" /> GitHub
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link linkedin">
                <Icon name="linkedin" /> LinkedIn
              </a>
              <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="profile-link portfolio">
                <Icon name="portfolio" /> Portfolio
              </a>
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
              }} className="search-button clear-button">
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
            {/* Display search results here */}
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
                  {safeJsonParse(project.links).map((link, index) => (
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

      <div className="section-card">
        <h2 className="section-title"><Icon name="work" /> Experience</h2>
        <div className="projects-grid">
          {profile.work.map(job => (
            <div key={job.id} className="project-card">
              <h3>{job.position} at {job.company}</h3>
              <p className="job-duration">{job.duration}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title"><Icon name="trophy" /> Achievements</h2>
        <div className="achievements-list">
          <div className="achievement-item">
            <Icon name="trophy" /> Knight at LeetCode
          </div>
          <div className="achievement-item">
            <Icon name="trophy" /> Global Rank 138 in Weekly Contest at LeetCode #453 and 212 in #443
          </div>
          <div className="achievement-item">
            <Icon name="trophy" /> Solved 600+ Coding Problems on LeetCode and GFG
          </div>
          <div className="achievement-item">
            <Icon name="trophy" /> All India Rank 15,970 in JEE Mains 2021 among 1+ million candidates
          </div>
          <div className="achievement-item">
            <Icon name="trophy" /> Core Member, Fine Arts Society (FAS), NIT Jalandhar
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;