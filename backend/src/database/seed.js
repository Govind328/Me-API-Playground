const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath);


const profileData = {
  name: 'Govind Singh',
  email: 'govindsinghsatwas@gmail.com',
  education: 'Dr. B R Ambedkar National Institute of Technology, Jalandhar (Dec 2021 – June 2025)'
};

const skillsData = [
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
];

const projectsData = [
  {
    title: 'Bit-Bridge - College Student Community',
    description: 'An online discussion forum for college students to collaborate on coding, placement and semester exam doubts, while also sharing academic resources. This platform allows searching and filtering of questions and quizzes according to domain, subject and tag along with voting, and answer verification by instructors.',
    links: JSON.stringify([{ name: 'GitHub', url: 'https://github.com/Govind328/bit-bridge' }])
  },
  {
    title: 'Sumz - AI Web Summarizer',
    description: 'A web application React.js and Redux project that allows users to input website links, harnessing the power of AI to extract and summarize relevant information from webpages. Integrated sharing feature for efficient information sharing.',
    links: JSON.stringify([{ name: 'GitHub', url: 'https://github.com/Govind328/sumz-ai-summarizer' }])
  },
  {
    title: 'Bank Management System',
    description: 'Developed a Bank Management System in C/C++ with file handling and database design. Created modules for account creation, deposits, withdrawals, balance inquiry with secure login-based authentication.',
    links: JSON.stringify([{ name: 'GitHub', url: 'https://github.com/Govind328/bank-management-system' }])
  }
];

const workData = [
  {
    company: 'Software Management Solutions Ltd',
    position: 'Software Engineer Intern',
    duration: 'June 2024 – July 2024',
    description: 'Developed a Bank Management System in C/C++ with file handling and database design. Created modules for account creation, deposits, withdrawals, balance inquiry. Implemented secure login-based authentication with admin privileges.'
  },
  {
    company: 'NIT Jalandhar',
    position: 'Student Developer & Core Member, Fine Arts Society',
    duration: '2021 – 2025',
    description: 'Worked on academic projects involving Data Structures, Operating Systems, DBMS, and OOP. Core member of Fine Arts Society organizing technical and cultural events.'
  }
];

const linksData = {
  github: 'https://github.com/Govind328',
  linkedin: 'https://www.linkedin.com/in/govind-singh-131806232/',
  portfolio: 'https://bitbridge.netlify.app/'
};


const schemaPath = path.join(__dirname, '..', '..', 'schema.sql');
fs.readFile(schemaPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading schema file:', err);
    db.close();
    return;
  }
  
  console.log('Executing schema...');
  db.exec(data, (err) => {
    if (err) {
      console.error('Error executing schema:', err);
      db.close();
      return;
    }
    
    console.log('Database schema created successfully');
    insertData();
  });
});

function insertData() {
  console.log('Starting to insert data...');
  
  
  db.run(
    'INSERT OR REPLACE INTO profiles (id, name, email, education) VALUES (1, ?, ?, ?)',
    [profileData.name, profileData.email, profileData.education],
    function(err) {
      if (err) {
        console.error('Error inserting profile:', err);
        return;
      }
      console.log('Profile inserted with ID:', this.lastID);
      
      
      db.run('DELETE FROM skills WHERE profile_id = 1', (err) => {
        if (err) {
          console.error('Error clearing skills:', err);
          return;
        }
        
        
        const skillStmt = db.prepare('INSERT INTO skills (profile_id, skill, proficiency) VALUES (1, ?, ?)');
        skillsData.forEach(skill => {
          skillStmt.run([skill.skill, skill.proficiency], (err) => {
            if (err) console.error('Error inserting skill:', err);
          });
        });
        skillStmt.finalize();
        console.log('Skills inserted');
      });

      
      db.run('DELETE FROM projects WHERE profile_id = 1', (err) => {
        if (err) {
          console.error('Error clearing projects:', err);
          return;
        }
        
        
        const projectStmt = db.prepare('INSERT INTO projects (profile_id, title, description, links) VALUES (1, ?, ?, ?)');
        projectsData.forEach(project => {
          projectStmt.run([project.title, project.description, project.links], (err) => {
            if (err) console.error('Error inserting project:', err);
          });
        });
        projectStmt.finalize();
        console.log('Projects inserted');
      });

      
      db.run('DELETE FROM work_experience WHERE profile_id = 1', (err) => {
        if (err) {
          console.error('Error clearing work experience:', err);
          return;
        }
        
        
        const workStmt = db.prepare('INSERT INTO work_experience (profile_id, company, position, duration, description) VALUES (1, ?, ?, ?, ?)');
        workData.forEach(work => {
          workStmt.run([work.company, work.position, work.duration, work.description], (err) => {
            if (err) console.error('Error inserting work experience:', err);
          });
        });
        workStmt.finalize();
        console.log('Work experience inserted');
      });

      
      db.run(
        'INSERT OR REPLACE INTO profile_links (profile_id, github, linkedin, portfolio) VALUES (1, ?, ?, ?)',
        [linksData.github, linksData.linkedin, linksData.portfolio],
        (err) => {
          if (err) {
            console.error('Error inserting links:', err);
            return;
          }
          console.log('Links inserted');
        }
      );
    }
  );
}

// Close database after all operations
setTimeout(() => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database seeded successfully with Govind Singh\'s resume data');
      console.log('👤 Name: Govind Singh');
      console.log('📧 Email: govindsinghsatwas@gmail.com');
      console.log('🎓 Education: Dr. B R Ambedkar National Institute of Technology, Jalandhar');
      console.log('🐱 GitHub: https://github.com/Govind328');
      console.log('💼 LinkedIn: https://www.linkedin.com/in/govind-singh-131806232/');
      console.log('🌐 Portfolio: https://bitbridge.netlify.app/');
    }
  });
}, 2000);