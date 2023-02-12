// eslint-disable-next-line import/no-extraneous-dependencies
import Captcha from "node-captcha-generator";
import { v4 as uuidv4 } from "uuid";

const CAPCHA_LENGTH = 5;
const CAPCHA_WIDTH = 450;
const CAPCHA_HEIGHT = 200;
const CAPCHA_TIMEOUT = 260000;

class CaptchaGenerator {
  capches = {};

  async newCapcha() {
    const capcha = new Captcha({
      length: CAPCHA_LENGTH,
      size: {
        width: CAPCHA_WIDTH,
        height: CAPCHA_HEIGHT,
      },
    });
    const token = uuidv4();
    this.capches[token] = capcha;
    const image = await this.getImage(token);

    setTimeout(() => {
      try {
        delete this.capches[token];
      } catch {
        /* empty */
      }
    }, CAPCHA_TIMEOUT);

    return { token, image };
  }

  async getImage(token) {
    return new Promise((res, rej) => {
      this.capches[token].toBase64((err, image) => {
        if (err) rej(err);
        res(image);
      });
    });
  }

  checkCorrectCapcha(token, value) {
    const capcha = this.capches[token];
    if (!capcha) return false;

    console.log(capcha.value, typeof capcha.value);

    if (capcha.value !== value) {
      console.log("capcha.getValue() != value");
      delete this.capches[token];

      return false;
    }

    delete this.capches[token];

    return true;
  }

  getValue() {
    return this.capcha.value;
  }
}

export const capchaGenerator = new CaptchaGenerator();
