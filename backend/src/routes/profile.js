const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getProjectsBySkill,
  getTopSkills,
  searchProfile,
  healthCheck
} = require('../controllers/profileController');


router.get('/profile', getProfile);
router.put('/profile', updateProfile);


router.get('/projects', getProjectsBySkill);
router.get('/skills/top', getTopSkills);
router.get('/search', searchProfile);


router.get('/health', healthCheck);

module.exports = router;