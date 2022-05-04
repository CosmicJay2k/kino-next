import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { LoginContext } from "../contexts/loginContext.js";

//components
import Input from "./UserInput";

export default function UserLoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { userObj, setUserObj } = useContext(LoginContext);


  async function handleSubmit(e) {
    e.preventDefault();
    const data = { userName, password};
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const Obj = await res.json() 
    setUserObj(Obj);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input _label={"User Name: "} _setState={setUserName} />
      <Input
        _minLgth={6}
        _label={"password"}
        _type="password"
        _setState={setPassword}
      />
      <button
        type="submit"
      >
        login
      </button>
      <Link href="/test">
        <a>test page</a>
      </Link>
    </form>
  );
}