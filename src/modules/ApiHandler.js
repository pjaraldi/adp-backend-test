const axios = require("axios");

class ApiHandeler {

	// Default axios config to avoid CORS errors
	static axiosDefautlConfig = {
		mode: 'no-cors',
		headers: {
		  'Access-Control-Allow-Origin': '*',
		  'Content-Type': 'application/json',
		},
	};

	static get(url, additionalConfig) {
		const config = !additionalConfig ? ApiHandeler.axiosDefautlConfig : additionalConfig;
		const result = axios.get(url, config);
		return result;
	};

	static post(url, data, additionalConfig) {
		const config = !additionalConfig ? ApiHandeler.axiosDefautlConfig : additionalConfig;
		const result =  axios.post(url, data, config);
		return result;
	};
}

exports.ApiHandeler = ApiHandeler;
