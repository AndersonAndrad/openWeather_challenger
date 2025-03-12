export const getCurrentTime = () => {
    const currentDate = new Date();

    let hours: number = currentDate.getHours();
    let minutes: number = currentDate.getMinutes();
    let seconds: number = currentDate.getSeconds();

    hours = Number((hours < 10) ? '0' + hours : hours);
    minutes = Number((minutes < 10) ? '0' + minutes : minutes);
    seconds = Number((seconds < 10) ? '0' + seconds : seconds);

    const hours24 = (hours >= 12) ? 'PM' : 'AM';

    hours = (hours === 0) ? 12 : hours;

    return `${hours}:${minutes}:${seconds} ${hours24}`;
};