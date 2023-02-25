import type { UserData } from "../data/authData";

import { getUserToken } from "./Auth";

export const getUsers = (search?: string) =>
  fetch(
    `https://rsgames.online:8888/auth/users${
      search ? `?search=${search}` : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getUserToken()}`,
      },
    }
  ).then<UserData[]>((response) => response.json());

export const getUser = (name: string) =>
  fetch(`https://rsgames.online:8888/auth/user?userName=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  }).then<UserData>((response) => response.json());

export const banUser = async (userName: string) =>
  fetch(`https://rsgames.online:8888$/auth/user/ban?userName=${userName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

export const unbanUser = async (userName: string) =>
  fetch(`https://rsgames.online:8888$/auth/user/unban?userName=${userName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
  });

export const deleteUser = (name: string) =>
  fetch(`https://rsgames.online:8888/auth/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify({ userName: name }),
  }).then((response) => response.json());
