import axios from "axios";
import { AsyncStorage } from "react-native";
import { ApiUrl } from "./constants";

import EventEmitter from "EventEmitter";

const log = function() {
  if (__DEV__) {
    console.log.apply(console, arguments);
  }
};

var instance = axios.create({
  baseURL: ApiUrl,
  timeout: 30000,
  headers: { "X-App-Version": "Alpha" }
});

const request = async ({ method, url, data, headers }) => {
  log(`Sending ${method} request to`, url, data);
  var promise = instance[method](url, data);
  const response = await promise;

  log(`Response from ${url}`, response);
  const payload = response.data;
  if (payload.status !== 200) {
    throw new Error(payload["msg"]);
  }

  if (headers) {
    return {
      data: payload.data,
      headers: response.headers
    };
  }

  return payload.data;
};

const get = (url, params) => request({ method: "get", url, ...params });
const post = (url, data, params) =>
  request({ method: "post", url, data, ...params });

const COOKIE_KEY = "@SBService:cookieStore";
const EMITTER_KEY = "@SBService:RestaurantStatus";

class Service {
  admin = false;

  restaurantStatus = null;
  statusEmitter = new EventEmitter();

  scheduleRestaurantStatusUpdater() {
    this.statusInterval = setInterval(
      this.updateRestaurantStatus.bind(this),
      60000
    );

    this.updateRestaurantStatus();
  }

  unscheduleRestaurantStatusUpdater() {
    clearInterval(this.statusInterval);
  }

  addRestaurantStatusListener(callback) {
    this.statusEmitter.addListener(EMITTER_KEY, callback);

    if (this.restaurantStatus) {
      callback(this.restaurantStatus);
    }
  }

  removeRestaurantStatusListener(callback) {
    this.statusEmitter.removeListener(EMITTER_KEY, callback);
  }

  setRestaurantID(restaurantID) {
    this.restaurantID = restaurantID;
    this.scheduleRestaurantStatusUpdater();
  }

  clearRestaurantID() {
    delete this.restaurantID;
    this.unscheduleRestaurantStatusUpdater();
  }

  async updateRestaurantStatus() {
    const [status, info] = await Promise.all([
      this.getRestaurantStatus(),
      this.getCharityInfo()
    ]);

    this.restaurantStatus = {
      delivery: status.delivery,
      pickup: status.pickup,
      restaurant_status: status.restaurant_status,
      donations_count: info.meal_count
    };

    this.statusEmitter.emit(EMITTER_KEY, this.restaurantStatus);
  }

  storeCookies(cookies) {
    return AsyncStorage.setItem(COOKIE_KEY, cookies);
  }

  async restoreCookies() {
    try {
      const cookies = await AsyncStorage.getItem(COOKIE_KEY);
      instance.defaults.headers["Cookies"] = cookies;
      return cookies;
    } catch (e) {
      return null;
    }
  }

  async login(Email, Password) {
    const response = await post(
      "User/loginUser",
      {
        Email,
        Password,
        isSingle:1
      },
      { headers: true }
    );
    const data = response.data;
    this.session = data;
    //this.setRestaurantID(data["restaurant_id"]);
    await this.setAdmin(data["email"]);
    // this.storeCookies(response.headers["set-cookie"]);
    return data;
  }

  async getLoginStatus() {
    const data = await get("admin/restaurants/login_status");
    this.session = data;
    this.setRestaurantID(data["restaurant_id"]);
    await this.setAdmin(data["email"]);
    return data;
  }

  async setAdmin(email) {
    await this.fetchEmployee()
      .then(response => {
        _this = this;
        response.filter(function(object) {
          if (object.email == email) {
            _this.admin = object.is_admin;
          }
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  isAdmin() {
    return this.admin;
  }

  getRecentOrders() {
    return get("admin/restaurants/all_orders_today");
  }

  fetchEmployee() {
    const url = `admin/restaurants/restaurant_employees/${this.restaurantID}/`;
    return get(url);
  }

  addEmployee(employee) {
    return post(
      `admin/restaurants/add_restaurant_emp/${this.restaurantID}/`,
      employee
    );
  }

  deactivateEmployee(id) {
    return post(
      `admin/restaurants/${this.restaurantID}/delete_restaurant_emp/${id}/`
    );
  }

   deactivateDiscount(id) {
    let body = { discount_id: id, value: 1 };
    return post(`admin/restaurants/activate_deactivate_discounts/`, body);
  }

  async logout() {
    const response = await post(`admin/restaurants/logout/`);
    this.clearRestaurantID();
    return response;
  }
}

export default new Service();
