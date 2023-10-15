
function random99() {

    const time = Date.now();
    const first = Math.floor(time / 100000);
    const second = time % 100000;

    const randomNumber = Math.floor(Math.random() * 100001);

    const result = Math.floor((first + randomNumber) * second) % 100;

    return result;
} 

function random99_range(first, second) {

    const randomNumber = random99();
    const result = (randomNumber % (second - first)) + first;

    return result;
} 
