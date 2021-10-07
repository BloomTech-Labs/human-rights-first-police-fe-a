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

	console.log(request);

	console.log(incident.incident_id);

	return axios.post('http://hrf-bw-labs37-dev.eba-hz3uh94j.us-east-1.elasticbeanstalk.com/form-out/', request);
}
