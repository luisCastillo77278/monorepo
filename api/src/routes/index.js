const { Router } = require('express');
const blogRouter = require('./blog');
const noteRouter = require('./note');
const userRouter = require('./user');
const loginRouter = require('./login');

const router = Router();

router.use('/blogs', blogRouter);
router.use('/notes', noteRouter);
router.use('/users', userRouter);
router.use('/login', loginRouter);

module.exports = router;