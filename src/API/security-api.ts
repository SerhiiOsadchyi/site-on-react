import {instance} from "./api";

export const securityAPI = {
    captchaURL() {
        return instance.get(`security/get-captcha-url`);
    }
}