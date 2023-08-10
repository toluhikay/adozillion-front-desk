import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoaderComponent = () => {
	return (
		<div className='w-full h-full justify-center items-center py-12'>
			<RotatingLines strokeColor='#fff' strokeWidth='5' animationDuration='0.75' width='96' visible={true} />
		</div>
	);
};

export default LoaderComponent;
