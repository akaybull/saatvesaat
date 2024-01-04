import React, { useEffect, useState } from "react";
import { fetchLoginData } from "../redux/loginSlice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
const Login = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const loginStatus = useSelector((state) => state.login.status);

  const [formData, setFormData] = useState({
    tcNumber: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchLoginData());
    setModalVisible(true);
  };
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <form
      className="w-1/5 p-8 flex flex-col items-center justify-center bg-[#7460ef] rounded-3xl gap-4"
      onSubmit={handleSubmit}
    >
      <img
        alt="logo"
        src="https://cdn.saatvesaat.com.tr/skin/frontend/base/default/images/new-logo.png"
        className="mb-4"
      ></img>
      <input
        className="w-full rounded-2xl p-2 placeholder-[#656f77]"
        placeholder="TC Kimlik Numarası"
        type="number"
        name="tcNumber"
        value={formData.tcNumber}
        onChange={handleChange}
      />
      <input
        className="w-full rounded-2xl p-2 placeholder-[#656f77]"
        placeholder="Şifre"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <div className="flex w-full justify-between">
        <div>
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label className="ml-2 text-white" htmlFor="remember-me">
            Beni Hatırla
          </label>
        </div>
      </div>
      <button
        className="w-full border-2 rounded-2xl text-white p-2"
        type="submit"
        disabled={loginStatus === "loading"}
      >
        Giriş Yap
      </button>
      {modalVisible && <Modal />}
    </form>
  );
};

export default Login;
