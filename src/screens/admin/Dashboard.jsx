import React, { useCallback, useEffect, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUserDetail, userLogOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { supabase } from "../../lib/api";
import { toast } from "react-hot-toast";
import { getUserData } from "../../apis/getDataApis";

const Dashboard = () => {
  const [userData, setUSerData] = useState(null);
  const data = useCallback(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUSerData(user);
    };
    getUser();
  }, []);

  // console.log("user", userData);
  const dispatch = useAppDispatch();
  const [realtor, setRealtor] = useState("");
  const [inputRealtor, setInputRealtor] = useState(false);
  const [clientCatgeory, setClientCategory] = useState("");
  const [reasonForCall, setReasonForCall] = useState("");
  const [mediumOfComm, setMediumOfComm] = useState("");
  const [directCall, setDirectCall] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      client_category: "",
      realtor_group: "",
      reason_of_call: "",
      // contact_person_dept: "",
      contact_person: "",
      product: "",
      site_to_inspect: "",
      // product_to_inquire: "",
      medium_of_comm: "",
      social_media_type: "",
      call_type: "",
      direct_call_type: "",
    },
    onSubmit: async (values) => {
      const formValues = { ...values, realtor_group: realtor, contact_person: userData?.email, client_category: clientCatgeory, reason_of_call: reasonForCall, medium_of_comm: mediumOfComm, call_type: directCall };
      console.log(formValues);
      const { data, error } = await supabase.from("reception-clients").insert([formValues]).select();
      if (data) {
        toast.success("Form Submitted Successfully");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
        formik.handleReset();
      } else if (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="bg-[#fff] h-screen overflow-auto w-full  flex flex-col items-center">
      <header className="sticky top-0 left-0 bg-white px-[20px] pt-[20px] w-full flex items-center justify-between">
        <div className="w-full flex flex-col items-center">
          <img src={Logo} alt="" />
          <h1 className="py-6 text-[32px]">Submit Caller Info</h1>
        </div>
        <div></div>
      </header>
      <section className="px-[30px] my-2 flex items-center justify-center w-full h-auto">
        <form onSubmit={formik.handleSubmit} className="bg-[#a3a098] py-8 px-7 rounded-lg flex flex-col text-start h-auto w-[734px] max-w-full" action="">
          <div className="w-full mb-6">
            <label className="text-sm font-light" htmlFor="">
              Full Name
            </label>
            <br />
            <input {...formik.getFieldProps("full_name")} className="w-full rounded border-[#e9aa08] outline-none border p-2" type="text" required />
          </div>

          <div className="w-full mb-6">
            <label className="text-sm font-light" htmlFor="">
              Email
            </label>
            <br />
            <input {...formik.getFieldProps("email")} className="w-full rounded border-[#e9aa08] outline-none border p-2" type="text" required />
          </div>
          <div className="w-full mb-6">
            <label className="text-sm font-light" htmlFor="">
              Phone Number
            </label>
            <br />
            <input {...formik.getFieldProps("phone_number")} className="w-full rounded border-[#e9aa08] outline-none border p-2" type="text" required />
          </div>

          <div className="w-full mb-6">
            <label className="text-sm font-light" htmlFor="">
              Client Category
            </label>
            <br />
            <select
              className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2"
              id=""
              required
              onChange={(e) => {
                setClientCategory(e.target.value);
              }}
            >
              <option value="">Select and Option</option>
              <option value="Realtor">Realtor</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          {clientCatgeory === "Realtor" ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Realtor Group
              </label>
              <br />
              <select
                className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2"
                id=""
                required
                onChange={(e) => {
                  if (e.currentTarget.value !== "OTHERS") {
                    setRealtor(e.currentTarget.value);
                    setInputRealtor(false);
                  } else if (e.currentTarget.value === "OTHERS") {
                    setInputRealtor(true);
                    setRealtor("");
                  }
                }}
              >
                <option value="">Select and Option</option>
                <option value="REMS">REMS</option>
                <option value="BRG">BRG</option>
                <option value="TEAM FOCUS">TEAM FOCUS</option>
                <option value="VGR">VGR</option>
                <option value="OTHERS">OTHERS</option>
              </select>
            </div>
          ) : null}
          {inputRealtor ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Enter Realtor Name
              </label>
              <br />
              <input
                type="text"
                className="w-full rounded border-[#e9aa08] outline-none border p-2"
                onChange={(e) => {
                  if (inputRealtor) {
                    setRealtor(e.target.value);
                  }
                }}
                required={inputRealtor}
              />
            </div>
          ) : null}
          <div className="w-full mb-6">
            <label className="text-sm font-light" htmlFor="">
              Reason for call
            </label>
            <br />
            <select
              className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2"
              //   {...formik.getFieldProps("reason_of_call")}
              id=""
              onChange={(e) => {
                setReasonForCall(e.target.value);
              }}
              required
            >
              <option value="">Select and Option</option>
              <option value="INSPECTION">INSPECTION</option>
              <option value="DOCUMENT COLLECTION">DOCUMENT COLLECTION</option>
              <option value="INQUIRY">INQUIRY</option>
            </select>
          </div>
          {reasonForCall === "INSPECTION" ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Site to Inspect
              </label>
              <br />
              <select className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2" {...formik.getFieldProps("site_to_inspect")} id="" required={reasonForCall === "INSPECTION"}>
                <option value="">Select an Option</option>
                <option value="EVGC">EVGC</option>
                <option value="MONTE CARLO LAGOS">MONTE CARLO LAGOS</option>
                <option value="MUFASA APARTMENTS">MUFASA APARTMENTS</option>
              </select>
            </div>
          ) : reasonForCall === "INQUIRY" ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Product of Interest
              </label>
              <br />
              <select className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2" {...formik.getFieldProps("product")} id="" required={reasonForCall === "INQUIRY"}>
                <option value="">Select an Option</option>
                <option value="EVGC">EVGC</option>
                <option value="MONTE CARLO LAGOS">MONTE CARLO LAGOS</option>
                <option value="MUFASA APARTMENTS">MUFASA APARTMENTS</option>
              </select>
            </div>
          ) : null}
          <div className="w-full mb-6">
            <label className="text-sm font-light" htmlFor="">
              Medium of Communication
            </label>
            <br />
            <select
              className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2"
              onChange={(e) => {
                setMediumOfComm(e.target.value);
              }}
              id=""
              required
            >
              <option value="">Select and Option</option>
              <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
              <option value="CALL">CALL</option>
            </select>
          </div>
          {mediumOfComm === "SOCIAL MEDIA" ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Social Media
              </label>
              <br />
              <select className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2" {...formik.getFieldProps("social_media_type")} id="" required>
                <option value="">Select and Option</option>
                <option value="WHATSAPP">WHATSAPP</option>
                <option value="X">X</option>
                <option value="INSTAGRAM">INSTAGRAM</option>
              </select>
            </div>
          ) : mediumOfComm === "CALL" ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Call Type
              </label>
              <br />
              <select
                className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2"
                onChange={(e) => {
                  setDirectCall(e.target.value);
                }}
                id=""
                required={mediumOfComm === "CALL"}
              >
                <option value="">Select and Option</option>
                <option value="DIRECT CALL">DIRECT CALL</option>
                <option value="WHATSAPP CALL">WHATSAPP CALL</option>
              </select>
            </div>
          ) : null}
          {directCall === "DIRECT CALL" ? (
            <div className="w-full mb-6">
              <label className="text-sm font-light" htmlFor="">
                Wave
              </label>
              <br />
              <select className="w-full rounded text-sm  border-[#e9aa08] outline-none border p-2" id="" {...formik.getFieldProps("direct_call_type")} required={directCall === "DIRECT CALL"}>
                <option value="">Select and Option</option>
                <option value="1004">1004</option>
                <option value="IKATE BRIDGE">IKATE BRIDGE</option>
              </select>
            </div>
          ) : null}
          <div className="w-full flex my-3 items-center justify-center">
            <button className="w-[80%] px-[70px] py-2 bg-[#e9aa08] rounded" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>

      <div className="absolute top-6 right-6">
        <button
          className="bg-black text-white font-medium rounded py-2 px-5"
          onClick={() => {
            localStorage.clear();
            dispatch(userLogOut());
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
