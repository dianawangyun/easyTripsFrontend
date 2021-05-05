import axios from "axios";

const BASE_URL = process.env.EASYTRIPS_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't be any API-aware stuff elsewhere in the frontend.
 *
 */

class EasyTripsApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.log("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${EasyTripsApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    // **********user routes***********

    /** passing in required data to sign up and return token */
    static async signup(data) {
        let res = await this.request("auth/register", data, "post");
        return res.token;
    }

    /** passing in username and password to get token */
    static async login(data) {
        let res = await this.request("auth/token", data, "post");
        return res.token;
    }

    /* get current user information */
    static async getCurrentUser(username) {
        let res = await this.request(`user/${username}`);
        return res.user;
    }

    /** add a trip to current user */
    static async addTrip(username, data) {
        let res = await this.request(`trip/${username}`, data, "post");
        return res.trip;
    }

    /** get details of a trip */
    static async getTrip(username, tripId) {
        let res = await this.request(`trip/${username}/${tripId}`);
        return res.trip;
    }

    /** add an activity to a trip */
    static async addActivity(username, tripid, data) {
        let res = await this.request(
            `activity/${username}/${tripid}`,
            data,
            "post"
        );
        return res.activity;
    }
}

export default EasyTripsApi;
