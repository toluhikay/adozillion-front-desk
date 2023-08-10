import React, { useState } from "react";
import Logo from "../../assets/images/Logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/userAuth";
import { Navigate } from "react-router-dom";

const Login = () => {
	const token = useAuth();
	const [visible, setVisible] = useState(false);

	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required("password required"),
		}),
		onSubmit: async (values) => {
			try {
				const result = await dispatch(userLogin(values)).unwrap();
				if (result?.data?.session) {
					localStorage.setItem("token", result?.data?.session?.access_token);
				}
				if (result.error) {
					toast.error(result?.error?.message);
				}
			} catch (error) {
				toast.error(error?.error_description);
			}
		},
	});
	return token ? (
		<Navigate to={"/dashboard"} />
	) : (
		<div className='bg-authBg bg-blend-darken bg-black/80 flex px-[20px] flex-col justify-center items-center w-screen min-h-screen'>
			<div className='w-[500px] max-w-full bg-white min-h-[200px] rounded-lg flex flex-col items-center px-8 py-6'>
				<img src={Logo} alt='' className='pb-6' />
				<p className='text-3xl font-medium'>Welcome Back!</p>
				<p className='text-#c4c4c4'>Sign in your account to gain access</p>

				<form action='' className='w-full my-6' onSubmit={formik.handleSubmit}>
					<div className='w-full mb-6'>
						<input type='email' {...formik.getFieldProps("email")} placeholder='Email address' className='border outline-none w-full p-2 rounded border-[#c4c4c4]' />
						{formik.touched.email && formik.errors.email ? <p className='text-red-600 text-xs py-1'>{formik.errors.email}</p> : null}
					</div>
					<div className='w-full mb-6'>
						<div className='flex items-center border pr-2 overflow-hidden w-full rounded border-[#c4c4c4] justify-between'>
							<input type={visible ? "text" : "password"} {...formik.getFieldProps("password")} placeholder='Password' className='p-2 outline-none' />
							<p
								className='cursor-pointer'
								onClick={() => {
									setVisible(!visible);
								}}
							>
								{visible ? <AiFillEye /> : <AiFillEyeInvisible />}{" "}
							</p>
						</div>

						{formik.touched.password && formik.errors.password ? <p className='text-red-600 text-xs py-1'>{formik.errors.password}</p> : null}
					</div>

					<button className='bg-black rounded text-white font-medium w-full py-2' type='submit'>
						SIGN IN
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
