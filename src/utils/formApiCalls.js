// tweet form 0
// dm form 1

import axios from "axios";

// user

export function formOut(incident, sendDM = false) {
	const request = {
		form: sendDM ? 1 : 0,
		incident_id: incident.incident_id,
		tweet_id: incident.tweet_id,
		user_name: incident.user_name,
		link: "a link",
		body: "a body"
	};

	return axios.post('https://a.api.humanrightsfirst.dev/form-out/', request);
}
