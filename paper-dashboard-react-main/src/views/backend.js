import axios from "axios"

const API_URL = "http://localhost:8080";

export const getAllUsers = () =>
   axios.get(API_URL + "/auth/users").then((reponse) => reponse.data);

export const getUserById = (id) =>
   axios.get(API_URL + "/auth/users/" + id);

export const registerUser = (user) =>
   axios.post(API_URL + "/auth/users/register",user);

export const deleteUser = (email) =>
   axios.get(API_URL + "/auth/users/delete/" + email);

export const updateUser = (user) =>
   axios.post(API_URL + "/auth/users/update/" + user.id, user);

export const lockUser = (email) =>
   axios.get(API_URL + "/auth/users/lock/" + email);

export const unlockUser = (email) =>
   axios.get(API_URL + "/auth/users/unlock/" + email);

export const addRole = (email,role) =>
   axios.get(API_URL + "/auth/users/roles/" + email + "?role=" + role);

export const generateQr = (size, width, height) =>
   axios.get(API_URL + "/auth/qrcodes/" + size + "?W=" + width + "&H=" + height);

