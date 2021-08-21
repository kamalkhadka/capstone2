import axios from "axios";

const BASE_API_URL = "http://localhost:3001";

class InvestmentApi {

  static async login(credentials) {
    try {
      const res = await axios.post(`${BASE_API_URL}/login`, credentials);
      return res;
    } catch (err) {
      throw new Error(err.response.data.errorMessage);
    }
  }

  static async signup(user) {
    try {
      let res = await axios.post(`${BASE_API_URL}/users`, user);
      return res;
    }
    catch (err) {
      throw new Error(err.response.data.errorMessage);
    }
  }

  static async market(){
    try {
      let res = await axios.get(`${BASE_API_URL}/`);
      return res;
    } catch (err) {
      throw new Error(err.response.data.errorMessage);
    }
  }

}
export default InvestmentApi;