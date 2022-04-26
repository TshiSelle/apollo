const { User } = require("../models/user");
const { validateNameChangeInput } = require('../helperFunctions/inputValidation');



changeName = (req, res) => {
  const { FirstName, LastName } = req.body;
  const { errors, isValid } = validateNameChangeInput(req.body);
  if (!isValid) {
    res.status(400).json({ ...errors, success: false });
  } else {
    User.findById(req.user.id)
      .then((dbUser) => {
        if (!dbUser) {
          res.status(400).json({ message: 'User not found', success: false });
        }
        else {
          dbUser.FirstName = FirstName;
          dbUser.LastName = LastName;
          dbUser.save()
            .then(() => {
              res.status(202).json({ message: 'Name updated successfully', success: true });
            })
            .catch((err) => {
              res.status(500).json({ message: `Error occurred while saving to database : ${err}` });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: `Error occurred while searching for user : ${err}` });
      })
  }
};

module.exports = { changeName };