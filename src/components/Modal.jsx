import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dateTime from "../helpers/dateTime";

const Modal = () => {
  const loginData = useSelector((state) => state.login.data);
  const loginStatus = useSelector((state) => state.login.status);
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let redirectTimeout;

    if (loginStatus === "succeeded" && countdown > 0) {
      redirectTimeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      navigate("/kanban");
    }

    return () => clearTimeout(redirectTimeout);
  }, [loginStatus, countdown, navigate]);

  return loginStatus === "succeeded" ? (
    <div className="absolute w-full h-full bg-white flex items-center justify-center">
      <div className="flex items-center justify-center bg-slate-600 w-1/3 h-1/2 rounded-xl">
        <div className="flex w-full p-10 gap-10">
          <img className="rounded-xl" alt="avatar" src={loginData.avatar}></img>
          <div className="flex flex-col justify-evenly">
            <span className="text-white text-xl">İsim:{loginData.name}</span>
            <span className="text-white text-xl">Id: {loginData.id}</span>
            <span className="text-white text-xl">
              Oluşturulma Tarihi:
              {dateTime(loginData.createdAt)}
            </span>
            <span className="text-white text-xl">Geri Sayım: {countdown}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Giriş Yapılıyor</div>
  );
};

export default Modal;
