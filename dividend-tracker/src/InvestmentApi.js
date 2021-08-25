import axios from "axios";
import ValidationError from "./ValidationError";
import jwt_decode from "jwt-decode";

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

  static async market() {
    try {
      let res = await axios.get(`${BASE_API_URL}/`);
      return res;
    } catch (err) {
      throw new Error(err.response.data.errorMessage);
    }
  }

  static async getCurrentUser(id, token) {
    try {
      let user = await axios.get(`${BASE_API_URL}/users/${id}?token=${token}`);
      return user;
    } catch (err) {
      throw new Error(err.response.data.errorMessage);
    }
  }

  static async updateCurrentUser(user, token) {
    try {

      if (!user) {
        throw new ValidationError("Missing user");
      }

      if (user.updatePassword !== user.updateConfirmPassword) {
        throw new ValidationError("Password mismatch");
      }

      let updateUser = {};

      if (user.updateFirstName) {
        updateUser.firstName = user.updateFirstName;
      }

      if (user.updateLastName) {
        updateUser.lastName = user.updateLastName;
      }

      if (user.updateEmail) {
        updateUser.email = user.updateEmail;
      }

      if (user.updatePassword) {
        updateUser.password = user.updatePassword;
      }

      if (updateUser.firstName || updateUser.lastName || updateUser.email || updateUser.password) {
        updateUser.token = token;

        const { id } = jwt_decode(token);

        let res = await axios.patch(`${BASE_API_URL}/users/${id}`, updateUser);
        return res.data;

      } else {
        throw new ValidationError("Please update values and then submit.");
      }


    } catch (err) {
      if (err instanceof ValidationError) {
        throw err;
      }
      throw new Error(err.response.data.errorMessage);
    }
  }

  static async deleteUser(id, token) {
    let res = await axios.delete(`${BASE_API_URL}/users/${id}?token=${token}`);
    return res.data;
  }

  static async yesterday(symbol) {
    let res = await axios.get(`${BASE_API_URL}/stocks/${symbol}`);
    return res.data;
  }


  static async addStock(symbol, id, stock) {
    let res = await axios.post(`${BASE_API_URL}/stocks/${symbol}/${id}`, stock);
    return res.data;
  }

  static async deleteStock(id,  token){
    let res = await axios.delete(`${BASE_API_URL}/securities/${id}?token=${token}`)
    return res.data;
  }

  // static async getStock(id, token){
  //   let res = await axios.get(`${BASE_API_URL}/securities/${id}`);
  //   return res.data;
  // }

  static async updateStock(stock , token){
    stock.token = token;
    let res = await axios.patch(`${BASE_API_URL}/securities/${stock.id}`, stock);
    return res.data;
  }

}
export default InvestmentApi;