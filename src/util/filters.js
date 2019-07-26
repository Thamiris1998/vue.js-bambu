import Vue from "vue";

Vue.filter("formattedDate", value => {
    var date = new Date(value);

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    var str = day + "/" + month + "/" + date.getFullYear() + " " +  hour + ":" + min;
    return str;
  });

  Vue.filter("formattedDouble", value => {
   return parseInt(value, 10);
  });

