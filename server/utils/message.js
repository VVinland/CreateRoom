import moment from 'moment';
const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
}

const generateLocationMessage = (from,lat,lng)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: moment().valueOf()
    };
}
export{
    generateMessage,
    generateLocationMessage
}
