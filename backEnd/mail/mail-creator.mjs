export const createMail = (isUserData, message, username, passwordOrURL) => {
  const contentData = isUserData
    ? `<h2 class="rsgames__mail-message" style="justify-self: center;text-align: center;width: calc(100% - 140px);padding: 100px 70px 0;font-size: 24px;font-weight: 500;color: #0a005fcf;opacity: 0.9;margin: 0 auto;">${message}</h2>
    <h3 class="rsgames__mail-submessage" style="justify-self: center;text-align: center;width: calc(100% - 140px);padding: 4px 70px 40px;font-size: 16px;font-weight: 500;color: #0a005fcf;opacity: 0.7;margin: 10px auto 0;line-height: 0.98;">
    Use your username and password to enter <a href="https://rsgames.online/"></a>the game portal</a></h2>
    <div class="rsgames__mail-data" style="margin: 10px auto 170px;display: grid;grid-template-columns: 1fr 1fr;gap: 8px 12px;font-size: 18px;color: #29004b;opacity: 0.9;">
      <div class="rsgames__mail-item-name" style="font-weight: 900;text-align: end;">User Name: </div>
      <div class="rsgames__mail-value">${username}</div>
      <div class="rsgames__mail-item-name" style="font-weight: 900;text-align: end;">Password: </div>
      <div class="rsgames__mail-value">${passwordOrURL}</div>
    </div>`
    : `<h2 class="rsgames__mail-message" style="justify-self: center;text-align: center;width: calc(100% - 140px);padding: 100px 70px 0;font-size: 24px;font-weight: 500;color: #0a005fcf;opacity: 0.9;margin: 0 auto;">${message}</h2>
    <h3 class="rsgames__mail-submessage" style="justify-self: center;text-align: center;width: calc(100% - 140px);padding: 4px 70px 40px;font-size: 16px;font-weight: 500;color: #0a005fcf;opacity: 0.7;margin: 10px auto 0;line-height: 0.98;">
    If you have not requested a password reset, please ignore this message. To reset your password, please click "Change Password" or copy the link below and open it in your browser.</h3>
    <div class="rsgames__mail-data" style="margin: 10px auto 170px;display: grid;grid-template-columns: 1fr 1fr;gap: 8px 12px;font-size: 18px;color: #29004b;opacity: 0.9;">
      <div class="rsgames__mail-item-name" style="font-weight: 900;text-align: end;">User Name: </div>
      <div class="rsgames__mail-value">${username}</div>
      <div class="rsgames__mail-item-name" style="font-weight: 900;text-align: end;">Password: </div>
      <div class="rsgames__mail-value">********</div>
      <a class="rsgames__mail-reset-link" href="${passwordOrURL}" style="text-transform: uppercase;font-size: 20px;text-align: center;color: ##3021b0e0;grid-column: 1 / 3;text-decoration: inherit;margin: 30px 0 -4px;">[Change password]</a>
      <a href="" class="rsgames__mail-reset-text" style="text-align: center;opacity: 0.5;font-size: 14px;grid-column: 1 / 3;margin: 0;">${passwordOrURL}</a>
    </div>`;

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div class="rsmain">
      <div class="rsgames">
        <div class="rsgames__mail-header" style="width: 100%;display: flex;flex-direction: column;justify-content: space-between;align-items: center;padding: 10px;box-shadow: 0 5px 5px -5px #f6e7ea;color: #1d1d1d;background: #f3f3f3;">
          <div class="rsgames__mail-logo" style="display: flex;align-items: center;gap: 10px;cursor: pointer;">
            <img class="rsgames__mail-logo-image" alt="joystick" src="https://rsgames.online/images/joystick.png" style="width: 60px;height: 60px;">
            <p class="rsgames__mail-logo-text" style="font-family: Ceviche One,cursive;font-size: 36px;font-weight: 600;color: #7e6dd1;margin: 0;margin-top:8px;">
              <img alt="logo text" src="https://rsgames.online/images/logo/gamingzone.png" width="167" height="26">
            </p>
          </div>
        </div>
        <h3 class="rsgames__mail-subtitle" style="justify-self: center;text-align: center;width: calc(100% - 140px);padding: 10px 70px;margin-top: 10px;font-size: 16px;font-weight: 100;color: #4f4c6b;opacity: 0.7;margin: 0 auto;">Gaming Zone has the best free online games selection and offers the most fun experience to play alone or with friends.</h3>
        <div class="rsgames__mail-body" style="display: flex;flex-direction: column;background: linear-gradient(
            #747bff00 0%,
            #747bff63 100%
          );">
          ${contentData}
        </div>
      </div>
      <div class="rsgames__mail-footer" style="height: auto;padding: 20px 16px;display: flex;flex-direction: column;gap: 24px;align-items: flex-start;justify-content: space-between;box-shadow: 0 -5px 5px -5px #f6e7ea;background: #180428;">
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img src="https://rsgames.online/images/logo.png" alt="logo" class="rsgames__mail-footer-logo" style="width: 80px;margin-bottom: 10px;">
        </a>
        <div class="rsgames__mail-footer-content" style="display: flex;flex-direction: column;align-items: flex-start;gap: 16px;color: #7e6dd1;font-weight: 700;">
          <a href="https://github.com/jerubrin" target="_blank" rel="noreferrer" style="font-family: Roboto,sans-serif;cursor: pointer;text-align: center;color: #7e6dd1;text-decoration: inherit;">Alexey Kuptsov</a>
          <a href="https://github.com/Kunitsa3" target="_blank" rel="noreferrer" style="font-family: Roboto,sans-serif;cursor: pointer;text-align: center;color: #7e6dd1;text-decoration: inherit;">Olya Kunitsa</a>
          <a href="https://github.com/LoginovskyMax" target="_blank" rel="noreferrer" style="font-family: Roboto,sans-serif;cursor: pointer;text-align: center;color: #7e6dd1;text-decoration: inherit;">Maxim Loginovsky</a>
        </div>
        <p class="rsgames__mail-footer-year" style="color: #b1aecb9f;font-weight: 600;">© 2023</p>
      </div>
    </div>
  </body>
  </html>`;
};
