import axios from "axios";

function PostAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

  return axios({
    method: "post",
    url: `http://localhost:8080${endpoint}`,
    data: data,
    headers: headers,
  });
}

function GetAxiosCall(endpoint, headers) {
  if (!headers) headers = {};
  return axios({
    method: "get",
    url: `http://localhost:8080${endpoint}`,
    headers: headers,
  });
}

function PatchAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

  return axios({
    method: "patch",
    url: `http://localhost:8080${endpoint}`,
    data: data,
    headers: headers,
  });
}

function DeleteAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

  return axios({
    method: "delete",
    url: `http://localhost:8080${endpoint}`,
    data: data,
    headers: headers,
  });
}

export function SignUpApiCall(Username, Email, FirstName, LastName, Password, ConfirmPassword) {
  const data = JSON.stringify({
    Username: Username,
    Email: Email,
    FirstName: FirstName,
    LastName: LastName,
    Password: Password,
    ConfirmPassword: ConfirmPassword
  });


  return PostAxiosCall('/register', data, { "Content-Type": "application/json" });
}

export function LoginApiCall(Username, Password) {
  const data = JSON.stringify({
    Username: Username,
    Password: Password,
  });

  return PostAxiosCall("/account/login", data, {
    "Content-Type": "application/json",
  });
}

export function SendEmail(Email) {
  const data = JSON.stringify({
    Email: Email
  });

  return PostAxiosCall("/account/forgotPass", data, {
    "Content-Type": "application/json",
  });
}

export function PasswordResetWithToken(Username, token, Password, ConfirmPassword) {
  const data = JSON.stringify({
    newPassword: Password,
    ConfirmPassword: ConfirmPassword
  });
  return PostAxiosCall(`/account/resetPass/${Username}/${token}`, data, {
    "Content-Type": "application/json",
  });
}

export function IsEmailTokenValid(Username, passResetToken) {
  return GetAxiosCall(`/account/resetPass/${Username}/${passResetToken}`);
}

export function ChangeUserPass(authToken, oldPassword, newPassword, ConfirmPassword) {//for logged in user
  const data = JSON.stringify({
    oldPassword,
    newPassword,
    ConfirmPassword
  });
  return PostAxiosCall('/account/changePass', data, { 'x-access-token': authToken });
}


export function IsVerificationTokenValid(Username, emailVerificationToken) {
  return GetAxiosCall(`/account/verify/${Username}/${emailVerificationToken}`);
}

export function IsUserTokenValid(authToken) {
  return GetAxiosCall('/verifyToken', { 'x-access-token': authToken });
}

export function GetUserInfo(authToken) {
  return GetAxiosCall('/user-info', { 'x-access-token': authToken });
}

export function ChangeName(FirstName, LastName, authToken) {
  const data = JSON.stringify({
    FirstName,
    LastName
  });
  return PatchAxiosCall('/profile/editName', data, { 'x-access-token': authToken });
}

export function DeactivateAccount(authToken) {
  return PostAxiosCall('/account/deactivate', {}, { 'x-access-token': authToken });
}

export function StopAccountDeactivation(authToken) {
  return PostAxiosCall('/account/undeactivate', {}, { 'x-access-token': authToken });
}

export function CreateJournal(authToken, title, body) {
  const data = JSON.stringify({
    title,
    body
  });
  return PostAxiosCall('/journal/create', data, { 'x-access-token': authToken });
}

export function GetPages(authToken) {
  return GetAxiosCall('/page/read', { 'x-access-token': authToken });
}

export function UpdatePage(authToken, pageID, newTitle, newBody) {
  const data = JSON.stringify({
    pageID,
    title: newTitle,
    body: newBody
  });

  return PatchAxiosCall('/page/update', data, { 'x-access-token': authToken });
}

export function DeletePage(pageID, authToken) {
  const data = JSON.stringify({
    pageID
  });

  return DeleteAxiosCall('/page/delete', { 'x-access-token': authToken });
}


