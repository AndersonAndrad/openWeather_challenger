"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = void 0;
var getCurrentTime = function () {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    hours = Number((hours < 10) ? '0' + hours : hours);
    minutes = Number((minutes < 10) ? '0' + minutes : minutes);
    seconds = Number((seconds < 10) ? '0' + seconds : seconds);
    var hours24 = (hours >= 12) ? 'PM' : 'AM';
    hours = (hours === 0) ? 12 : hours;
    return "".concat(hours, ":").concat(minutes, ":").concat(seconds, " ").concat(hours24);
};
exports.getCurrentTime = getCurrentTime;
