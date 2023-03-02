function getCookies() {
    const cookieString = document.cookie;
    if (cookieString) {
        const cookies = cookieString
            .split(';')
            .map(cookie => cookie.trim())
            .reduce((acc, cookie) => {
                const [name, value] = cookie.split('=');
                return { ...acc, [name]: value };
            }, {});
        return cookies;
    } else {
        return {};
    }
}

// Function to set cookie
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    
    // Define the regex pattern to validate the cookie value
    const pattern = /^[a-zA-Z0-9]+$/;
  
    if (!pattern.test(value)) {
      throw new Error('Invalid cookie value');
    }
  
    document.cookie = name + '=' + value + expires + '; path=/';
  }
  
// Get browser and OS information
const userAgent = navigator.userAgent;
const browserName = userAgent.match(/(chrome|firefox|safari|opera|edge)/i)[0];
const browserVersion = userAgent.match(/(version|chrome|firefox|safari|opera|opr|edge)[\s\/: ]*(\d+(\.\d+)?)/i)[2];
const operatingSystem = navigator.platform;
// 

const deviceType = navigator.userAgent.match(/Mobi/)? 'Mobile' : 'Desktop';

// Get IP address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      setCookie('browserName', browserName, 7);
      setCookie('browserVersion', browserVersion, 7);
      setCookie('operatingSystem', operatingSystem, 7);
      setCookie('deviceType', deviceType, 7);
      setCookie('ipAddress', ipAddress, 7);
    })
    .catch(error => {
      console.log('Unable to get IP address:', error);
    });
