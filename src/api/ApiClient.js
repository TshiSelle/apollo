import axios from "axios";
import globalVars from "../clientEnvVars";

const host =
  globalVars.NODE_ENV == "development"
    ? "http://localhost:8080"
    : "";

function PostAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

  return axios({
    method: "post",
    url: `${host}${endpoint}`,
    data: data,
    headers: headers,
  });
}

function GetAxiosCall(endpoint, headers) {
  if (!headers) headers = {};
  return axios({
    method: "get",
    url: `${host}${endpoint}`,
    headers: headers,
  });
}

function PatchAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

  return axios({
    method: "patch",
    url: `${host}${endpoint}`,
    data: data,
    headers: headers,
  });
}

function DeleteAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

  return axios({
    method: "delete",
    url: `${host}${endpoint}`,
    data: data,
    headers: headers,
  });
}

export function SignUpApiCall(
  username,
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
  gender
) {
  const data = JSON.stringify({
    username: username,
    email: email,
    fname: firstName,
    lname: lastName,
    password: password,
    confirmPassword: confirmPassword,
    gender: gender,
  });

  return PostAxiosCall("/register", data, {
    "Content-Type": "application/json",
  });
}

export function LoginApiCall(username, password) {
  const data = JSON.stringify({
    username: username,
    password: password,
  });

  return PostAxiosCall("/account/login", data, {
    "Content-Type": "application/json",
  });
}

export function SendEmail(email) {
  const data = JSON.stringify({
    email: email,
  });

  return PostAxiosCall("/account/forgotPass", data, {
    "Content-Type": "application/json",
  });
}

export function PasswordResetWithToken(
  username,
  token,
  password,
  confirmPassword
) {
  const data = JSON.stringify({
    newPassword: password,
    confirmPassword: confirmPassword,
  });
  return PostAxiosCall(`/account/resetPass/${username}/${token}`, data, {
    "Content-Type": "application/json",
  });
}

export function IsEmailTokenValid(username, passResetToken) {
  return GetAxiosCall(`/account/resetPass/${username}/${passResetToken}`);
}

export function ChangeUserPass(
  authToken,
  oldPassword,
  newPassword,
  confirmPassword
) {
  //for logged in user
  const data = JSON.stringify({
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return PostAxiosCall("/account/changePass", data, {
    "x-access-token": authToken,
  });
}

export function FilterPages(
  query,
  pageTitle,
  pageNumber
) {
  let title = pageTitle ? `&title=${pageTitle}` : ""; //pagetitle (string-anything)
  let pageNum = pageNumber ? `&pageNum=${pageNumber}` : ""; //number (preferably between 1-maxPageNum)
  return GetAxiosCall(
    `/search?searchString=${query}${title}${tgender}${tdegree}${MinyearsOfExp}${MaxyearsOfExp}${pageNum}`
  );
}

export function GetFilteredPage(id) {
  return GetAxiosCall(`/page-description/${id}`);
}

export function IsVerificationTokenValid(username, emailVerificationToken) {
  return GetAxiosCall(`/account/verify/${username}/${emailVerificationToken}`);
}

export function IsUserTokenValid(authToken) {
  return GetAxiosCall("/verifyToken", { "x-access-token": authToken });
}

export function GetUserInfo(authToken) {
  return GetAxiosCall("/user-info", { "x-access-token": authToken });
}

export function ChangeName(fname, lname, authToken) {
  const data = {
    fname: fname,
    lname: lname,
  };
  return PatchAxiosCall("/profile/editName", data, {
    "x-access-token": authToken,
  });
}

export function DeactivateAccount(authToken) {
  return PostAxiosCall(
    "/account/deactivate",
    {},
    { "x-access-token": authToken }
  );
}

export function ReactivateAccount(authToken) {
  return PostAxiosCall(
    "/account/undeactivate",
    {},
    { "x-access-token": authToken }
  );
}

export function CreatePage(authToken, title, body) {
  const data = { title, body };
  return PostAxiosCall("/page/create", data, {
    "x-access-token": authToken,
  });
}

export function GetUserPages(authToken) {
  return GetAxiosCall("/page/read", { "x-access-token": authToken });
}

export function UpdatePage(authToken, pageID, newTitle, newBody) {
  const data = {
    pageID,
    title: newTitle,
    body: newBody,
  };

  return PatchAxiosCall("/page/update", data, {
    "x-access-token": authToken,
  });
}

export function DeletePage(pageID, authToken) {
  const data = { pageID };

  return DeleteAxiosCall("/page/delete", data, {
    "x-access-token": authToken,
  });
}

export function ContactSupport(authToken, supportMessage) {
  //registered users
  const data = {
    supportMessage,
  };

  return PostAxiosCall("/contact/user", data, { "x-access-token": authToken });
}

export function ContactSupportExternal(fname, lname, email, supportMessage) {
  const data = JSON.stringify({
    fname: fname,
    lname: lname,
    email: email,
    supportMessage: supportMessage,
  });

  return PostAxiosCall("/contact/external", data, {
    "Content-Type": "application/json",
  });
}

export function CreateUserAppointment(
  authToken,
  title,
  description,
  date,
  repeat
) {
  const data = JSON.stringify({
    title,
    description,
    date,
    repeat,
  });
  return PostAxiosCall("/calendar/create", data, {
    "x-access-token": authToken,
  });
}

export function GetUserAppointments(authToken) {
  return GetAxiosCall("/calendar/getUserAppointments", {
    "x-access-token": authToken,
  });
}

export function DeleteUserAppointment(authToken, eventID) {
  return DeleteAxiosCall(
    `/calendar/deleteAppointment/${eventID}`,
    {},
    { "x-access-token": authToken }
  );
}

export function ModifyUserAppointment(
  authToken,
  eventID,
  title,
  description,
  date,
  repeat
) {
  const data = JSON.stringify({
    title,
    description,
    date,
    repeat,
  });

  return PatchAxiosCall(`/calendar/modify/${eventID}`, data, {
    "x-access-token": authToken,
  });
}

export function UploadProfilePicture(file, authToken) {
  if (!file || file.size <= 0) {
    console.log("File is empty");
    return;
  }
  const formData = new FormData();
  formData.append("File", file);
  console.log("sending to server");
  return PostAxiosCall("/profile/setProfilePic", formData, {
    "Content-Type": "multipart/form-data",
    "x-access-token": authToken,
  });
}

export function GetUserPicture(authToken) {
  return GetAxiosCall("/profile/getProfilePic", {
    "x-access-token": authToken,
  });
}

export function RemoveUserPicture(authToken) {
  return DeleteAxiosCall("/profile/removeProfilePic", {
    "x-access-token": authToken,
  });
}

