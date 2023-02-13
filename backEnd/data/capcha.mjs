// eslint-disable-next-line import/no-extraneous-dependencies
import Captcha from "node-captcha-generator";
import { v4 as uuidv4 } from "uuid";

const CAPCHA_LENGTH = 5;
const CAPCHA_WIDTH = 450;
const CAPCHA_HEIGHT = 200;
const CAPCHA_TIMEOUT = 5 * 60 * 1000;

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

    if (capcha.value !== value) {
      delete this.capches[token];

      return false;
    }

    delete this.capches[token];

    return true;
  }
}

export const capchaGenerator = new CaptchaGenerator();
