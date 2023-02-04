import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  /** Get list of all companies.
   * filters - object, like { nameLike: string }
   */
  static async getCompanies(filters) {
    const res = await this.request("companies", filters);
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of all jobs. */
  static async getJobs(filters) {
    const res = await this.request("jobs", filters);
    return res.jobs;
  }

  /** Sign up */
  static async signUp(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Login */
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /** Edit profile */
  static async editProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Get user data */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Apply to job */
  static async applyToJob(username, id) {
    const res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res.applied;
  }

  /** Get job data */
  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res;
  }

  /** Unapply to job */
  static async unapplyToJob(username, id) {
    console.log(username, id, "<--------------");
    const res = await this.request(
      `users/${username}/jobs/${id}`,
      {},
      "delete"
    );
    return res.unapplied;
  }
}

export default JoblyApi;
