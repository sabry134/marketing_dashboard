import React from 'react';

const MainMenu = () => {
  const handleLoginClick = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?' +
    'client_id=493552220595-5giqmfbhtfuuqudb08vsgft5mhc0hfir.apps.googleusercontent.com&' +
    'redirect_uri=https://ballistic-half-jumper.glitch.me/callback&' +
    'scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&' +
    'response_type=code&' +
    'access_type=offline';
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default MainMenu;
