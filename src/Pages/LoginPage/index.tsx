import React from "react";

export default function loginPage() {
  const registUser = () => {
    const obj = { userName: "Vasya", password: "123" };
    fetch(`http://Localhost:8888/registUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return <div>Окно регистрации или входа</div>;
}
