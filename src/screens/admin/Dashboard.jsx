import React from "react";
import Logo from "../../assets/images/Logo.png";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { userLogOut } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { supabase } from "../../lib/api";
import { toast } from "react-hot-toast";

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			full_name: "",
			email: "",
			phone_number: "",
			realtor_group: "",
			reason_of_call: "",
			contact_person_dept: "",
			contact_person: "",
			product: "",
		},
		onSubmit: async (values) => {
			const { data, error } = await supabase.from("reception-clients").insert([values]).select();
			if (data) {
				toast.success("Form Submitted Successfully");
				setTimeout(() => {
					window.location.reload();
				}, 1500);
				formik.handleReset();
			} else if (error) {
				console.log(error);
			}
		},
	});

	return (
		<div className='bg-[#fff] h-screen overflow-auto w-full  flex flex-col items-center'>
			<header className='sticky top-0 left-0 bg-white px-[20px] pt-[20px] w-full flex items-center justify-between'>
				<div className='w-full flex flex-col items-center'>
					<img src={Logo} alt='' />
					<h1 className='py-6 text-[32px]'>Submit Caller Info</h1>
				</div>
				<div></div>
			</header>
			<section className='px-[30px] my-2 flex items-center justify-center w-full h-auto'>
				<form onSubmit={formik.handleSubmit} className='bg-[#a3a098] py-8 px-7 rounded-lg flex flex-col text-start h-auto w-[734px] max-w-full' action=''>
					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Full Name
						</label>
						<br />
						<input {...formik.getFieldProps("full_name")} className='w-full rounded border-[#e9aa08] outline-none border p-2' type='text' required />
					</div>

					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Email
						</label>
						<br />
						<input {...formik.getFieldProps("email")} className='w-full rounded border-[#e9aa08] outline-none border p-2' type='text' required />
					</div>
					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Phone Number
						</label>
						<br />
						<input {...formik.getFieldProps("phone_number")} className='w-full rounded border-[#e9aa08] outline-none border p-2' type='text' required />
					</div>

					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Realtor Group
						</label>
						<br />
						<select className='w-full rounded text-sm  border-[#e9aa08] outline-none border p-2' {...formik.getFieldProps("realtor_group")} id='' required>
							<option value=''>Select and Option</option>
							<option value='RENS'>RENS</option>
							<option value='BRG'>BRG</option>
							<option value='TEAM FOCUS'>TEAM FOCUS</option>
							<option value='VGR'>VGR</option>
							<option value='NONE'>NONE</option>
						</select>
					</div>
					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Reason for call
						</label>
						<br />
						<select className='w-full rounded text-sm  border-[#e9aa08] outline-none border p-2' {...formik.getFieldProps("reason_of_call")} id='' required>
							<option value=''>Select and Option</option>
							<option value='OFFICIAL'>OFFICIAL</option>
							<option value='DOCUMENT'>DOCUMENT</option>
						</select>
					</div>
					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Contact Department
						</label>
						<br />
						<select className='w-full rounded text-sm  border-[#e9aa08] outline-none border p-2' {...formik.getFieldProps("contact_person_dept")} id='' required>
							<option value=''>Select and Option</option>
							<option value='CEO'>CEO</option>
							<option value='OPERATION'>OPERATION</option>
							<option value='FINANCE'>FINANCE</option>
							<option value='ADMIN'>ADMIN</option>
							<option value='MEDIA'>MEDIA</option>
							<option value='PROJECT'>PROJECT</option>
						</select>
					</div>
					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Contact Person
						</label>
						<br />
						<input {...formik.getFieldProps("contact_person")} className='w-full rounded border-[#e9aa08] outline-none border p-2' type='text' required />
					</div>
					<div className='w-full mb-6'>
						<label className='text-sm font-light' htmlFor=''>
							Product of interest
						</label>
						<br />
						<select className='w-full rounded text-sm  border-[#e9aa08] outline-none border p-2' {...formik.getFieldProps("product")} id='' required>
							<option value=''>Select and Option</option>
							<option value='EVGC'>EVGC</option>
							<option value='Mufasa Apartments'>Mufasa Apartments</option>
							<option value='Monte Carlo Lagos'>Monte Carlo Lagos</option>
						</select>
					</div>
					<div className='w-full flex my-3 items-center justify-center'>
						<button className='w-[80%] px-[70px] py-2 bg-[#e9aa08] rounded' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</section>

			<div className='absolute top-6 right-6'>
				<button
					className='bg-black text-white font-medium rounded py-2 px-5'
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
