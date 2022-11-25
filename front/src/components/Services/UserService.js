import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

//Sign Up
export const resgisterUser = async (payload) => {
	try {
		const config = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			`${API_URL}/api/v1/register`,
			payload,
			config,
		);
		return data;
	} catch (error) {
		return error?.response?.data?.message;
	}
};

//Login
export const loginUser = async (payload) => {
	try {
		const config = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			`${API_URL}/api/v1/login`,
			payload,
			config,
		);
		return data;
	} catch (error) {
		return error?.response?.data?.message;
	}
};

//My Account
export const loadUser = async () => {
	try {
		const response = await axios.get(`${API_URL}/api/v1/me`);
		if (response && response.data && response.data.success) {
			return response.data;
		}
	} catch (error) {
		return error?.response?.data?.message;
	}
};

//Update Profile
export const updateProfile = async (payload) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const  data  = await axios.post(
			`${API_URL}/api/v1/update`,
			payload,
			config,
		);
		console.log("<<<<<<<<<<<<data",data)
		return data;
	} catch (error) {
		return error?.response?.data?.message;
	}
};
