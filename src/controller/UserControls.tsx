import type { UserData } from "../data/authData";
import {
  MY_USER_PATH,
  BACKEND_URL,
  USERS_LIST,
  USER_PATH,
} from "../data/authData";

import { getUserToken } from "./Auth";

export const getUsers = async (search?: string) =>
  fetch(`${BACKEND_URL}${USERS_LIST}${search ? `?search=${search}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  }).then<UserData[]>((response) => response.json());

export const getUser = (name: string) => {
  const path = name ? `${USER_PATH}?userName=${name}` : MY_USER_PATH;

  return fetch(`${BACKEND_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  }).then<UserData>((response) => response.json());
};

export const setUserStatus = async (userName: string, status: string[]) =>
  fetch(`${BACKEND_URL}${USER_PATH}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify({ userName, status }),
  });

export const banUser = async (userName: string) =>
  fetch(`${BACKEND_URL}${USER_PATH}/ban?userName=${userName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

export const unbanUser = async (userName: string) =>
  fetch(`${BACKEND_URL}${USER_PATH}/unban?userName=${userName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

export const deleteUser = async (name: string) =>
  fetch(`${BACKEND_URL}${USER_PATH}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify({ userName: name }),
  }).then((response) => response.json());
