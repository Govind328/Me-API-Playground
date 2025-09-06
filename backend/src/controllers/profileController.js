const db = require('../database/db');


const getProfile = (req, res) => {
  const db = req.app.get('db');
  
  db.get('SELECT * FROM profiles WHERE id = 1', (err, profile) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    
    db.all('SELECT skill, proficiency FROM skills WHERE profile_id = 1', (err, skills) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
    
      db.all('SELECT * FROM projects WHERE profile_id = 1', (err, projects) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        
       
        db.all('SELECT * FROM work_experience WHERE profile_id = 1', (err, work) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          
          
          db.get('SELECT * FROM profile_links WHERE profile_id = 1', (err, links) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            
            res.json({
              ...profile,
              skills: skills || [],
              projects: projects || [],
              work: work || [],
              links: links || {}
            });
          });
        });
      });
    });
  });
};


const updateProfile = (req, res) => {
  const { name, email, education } = req.body;
  const db = req.app.get('db');
  
  db.run(
    'UPDATE profiles SET name = ?, email = ?, education = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
    [name, email, education],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ message: 'Profile updated successfully' });
    }
  );
};

const getProjectsBySkill = (req, res) => {
  const { skill } = req.query;
  const db = req.app.get('db');
  
  if (!skill) {
    return res.status(400).json({ error: 'Skill parameter is required' });
  }
  
  db.all(
    `SELECT p.* FROM projects p 
     JOIN project_skills ps ON p.id = ps.project_id 
     JOIN skills s ON ps.skill_id = s.id 
     WHERE s.skill = ? AND p.profile_id = 1`,
    [skill],
    (err, projects) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json(projects);
    }
  );
};


const getTopSkills = (req, res) => {
  const db = req.app.get('db');
  
  db.all(
    'SELECT skill, proficiency FROM skills WHERE profile_id = 1 ORDER BY proficiency DESC LIMIT 5',
    (err, skills) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json(skills);
    }
  );
};


const searchProfile = (req, res) => {
  const { q } = req.query;
  const db = req.app.get('db');
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  
  const searchTerm = `%${q}%`;
  
  
  Promise.all([
    new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM projects WHERE profile_id = 1 AND (title LIKE ? OR description LIKE ?)',
        [searchTerm, searchTerm],
        (err, projects) => {
          if (err) reject(err);
          else resolve(projects);
        }
      );
    }),
    new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM skills WHERE profile_id = 1 AND skill LIKE ?',
        [searchTerm],
        (err, skills) => {
          if (err) reject(err);
          else resolve(skills);
        }
      );
    }),
    new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM work_experience WHERE profile_id = 1 AND (company LIKE ? OR position LIKE ? OR description LIKE ?)',
        [searchTerm, searchTerm, searchTerm],
        (err, work) => {
          if (err) reject(err);
          else resolve(work);
        }
      );
    })
  ])
  .then(([projects, skills, work]) => {
    res.json({ projects, skills, work });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
};


const healthCheck = (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
};

module.exports = {
  getProfile,
  updateProfile,
  getProjectsBySkill,
  getTopSkills,
  searchProfile,
  healthCheck
};