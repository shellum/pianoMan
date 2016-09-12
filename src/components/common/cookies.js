var Cookies = {
  getCookieValue: function(name,defaultValue) {
    var cookies = document.cookie.split(';');
    var neededCookies = cookies.filter(function(item) {
      return item.indexOf(name)>=0;
    });
    return (neededCookies.length==0) ? defaultValue : neededCookies[0].split('=')[1];
  }
};

module.exports=Cookies;
