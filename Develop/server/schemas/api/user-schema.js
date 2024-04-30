const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePillz,
  deletePillz,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, savePillz);

router.route('/login').post(login);

router.route('/user').get(authMiddleware, getSingleUser);

router.route('/pillz/:pillzId').delete(authMiddleware, deletePillz);

module.exports = router;
