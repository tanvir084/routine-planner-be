const db = require('../models');

const User = db.user;

const userCheck = async (req, res, next) => {
  try {
    //console.log('user', req?.user);
    const { _id, email } = req?.user ?? {};
    const userCheck = await User.findOne({ _id, email }).select('_id email');

    if (!userCheck) {
      return res.status(404).send({
        success: false,
        message: 'User not found.',
      });
    }
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, message: 'Authentication failure!' });
  }
};

module.exports = { userCheck };
