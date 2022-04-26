const Validator = require('validator');
const isEmpty = require('is-empty');
const mongoose = require('mongoose');


//********** Input validation functions **********

function validateRegisterInput(data) {
  let errors = {};
  let { FirstName, LastName, Email, Username, Password, ConfirmPassword } = data;

  //converting empty fields to strings
  FirstName = !isEmpty(FirstName) ? FirstName : '';
  LastName = !isEmpty(LastName) ? LastName : '';
  Email = !isEmpty(Email) ? Email : '';
  Username = !isEmpty(Username) ? Username : '';
  Password = !isEmpty(Password) ? Password : '';
  ConfirmPassword = !isEmpty(ConfirmPassword) ? ConfirmPassword : '';

  //field checks (empty input / password rules / etc..)
  //Name Checks
  if (Validator.isEmpty(FirstName)) {
    errors.FirstName = 'First name field is required';
  }
  if (Validator.isEmpty(LastName)) {
    errors.LastName = 'Last name field is required';
  }
  else if (!Validator.isAlpha(FirstName) || !Validator.isAlpha(FirstName)) {
    errors.name = 'Name can only contain letters'
  }

  //Email Check
  if (Validator.isEmpty(Email)) {
    errors.Email = 'Email field is required';
  } else if (!Validator.isEmail(Email)) {
    errors.Email = 'Email is invalid';
  }
  //Username Check
  if (Validator.isEmpty(Username)) {
    errors.Username = 'Username field is required';
  } else if (hasWhiteSpace(Validator.trim(Username))) {
    errors.Username = 'Username should be one word';
  }
  //Password check
  if (Validator.isEmpty(Password)) {
    errors.Password = 'Password field is required';
  } else if (!Validator.isLength(Password, { min: 8, max: 64 })) {
    errors.Password = `Password must be at least 8 characters long${Password.length > 64 ? ' and less than 64' : ''}`;
  } else if (Validator.isEmpty(ConfirmPassword)) {
    errors.ConfirmPassword = 'Confirm Password field is required';
  } else if (!Validator.equals(Password, ConfirmPassword)) {
    errors.ConfirmPassword = 'Passwords must match';
  }
  return { errors, isValid: isEmpty(errors) };

}

function validateLoginInput(data) {
  let errors = {};
  let { Username, Password } = data;

  //converting empty fields to strings
  Username = !isEmpty(Username) ? Username : '';
  Password = !isEmpty(Password) ? Password : '';

  if (Validator.isEmpty(Username)) {
    errors.Username = 'Username field is required';
  }
  if (Validator.isEmpty(Password)) {
    errors.Password = 'Password field is required';
  }
  return { errors, isValid: isEmpty(errors) };
}

function validatePassChangeInput(data) {
  let errors = {};
  let { oldPassword, newPassword, confirmPassword } = data;

  oldPassword = !isEmpty(oldPassword) ? oldPassword : '';
  newPassword = !isEmpty(newPassword) ? newPassword : '';
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

  //Password check
  if (Validator.isEmpty(oldPassword)) {
    errors.oldPassword = 'Old Password field is required';
  }
  if (Validator.isEmpty(newPassword)) {
    errors.newPassword = 'New Password field is required';
  } else if (!Validator.isLength(newPassword, { min: 8, max: 64 })) {
    errors.newPassword = `Password must be at least 8 characters long${newPassword.length > 64 ? ' and less than 64' : ''}`;
  } else if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is required';
  } else if (!Validator.equals(newPassword, confirmPassword)) {
    errors.confirmPassword = 'Password confirmation must match new password';
  }
  return { errors, isValid: isEmpty(errors) };
}

function validateEmail(data) {
  let errors = {};
  let Email = data.Email;
  Email = !isEmpty(Email) ? Email : '';
  //Email Check
  if (Validator.isEmpty(Email)) {
    errors.Email = 'Email field is required';
  } else if (!Validator.isEmail(Email)) {
    errors.Email = 'Email is invalid';
  }
  return { errors, isValid: isEmpty(errors) };

}

function validatePassResetInput(data) {
  let errors = {};
  let { newPassword, confirmPassword } = data;

  newPassword = !isEmpty(newPassword) ? newPassword : '';
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';
  //Password check
  if (Validator.isEmpty(newPassword)) {
    errors.newPassword = 'New Password field is required';
  } else if (!Validator.isLength(newPassword, { min: 8, max: 64 })) {
    errors.newPassword = `Password must be at least 8 characters long${newPassword.length > 64 ? ' and less than 64' : ''}`;
  } else if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is required';
  } else if (!Validator.equals(newPassword, confirmPassword)) {
    errors.confirmPassword = 'Password confirmation must match new password';
  }
  return { errors, isValid: isEmpty(errors) };
}

function validateNameChangeInput(data) {
  let errors = {};
  let { FirstName, LastName } = data;
  FirstName = !isEmpty(FirstName) ? FirstName : '';
  LastName = !isEmpty(LastName) ? LastName : '';
  //Name Checks
  if (Validator.isEmpty(FirstName)) {
    errors.FirstName = 'First name field is required';
  }
  if (Validator.isEmpty(LastName)) {
    errors.LastName = 'Last name field is required';
  }
  else if (!Validator.isAlpha(FirstName) || !Validator.isAlpha(LastName)) {
    errors.name = 'Name can only contain letters'
  }
  return { errors, isValid: isEmpty(errors) }
}


function validateObjectID(id) {
  let errors = {};
  id = isEmpty(id) ? '' : id;

  if (Validator.isEmpty(id)) {
    errors.id = 'ID cannot be empty'
  } else if (!mongoose.Types.ObjectId.isValid(id)) {
    errors.id = 'ID is not a valid MongoDB ObjectID'
  }

  return { errors, isValid: isEmpty(errors) }
}


module.exports = {
  validateLoginInput,
  validateRegisterInput,
  validatePassChangeInput,
  validateEmail,
  validatePassResetInput,
  validateNameChangeInput,
  validateObjectID,
};


//mongoose.Types.ObjectId.isValid(id)


function hasWhiteSpace(s) {
  return /\s/g.test(s);
}