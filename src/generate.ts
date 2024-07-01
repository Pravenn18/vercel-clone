export const generate = () => {
    const string = "0123456789ABCD";
    const length = 5;
    let randomString = '';
    for(let i = 0; i < length; i++){
        randomString += string[Math.floor(Math.random()*string.length)];
    }
    return randomString;
}

generate();