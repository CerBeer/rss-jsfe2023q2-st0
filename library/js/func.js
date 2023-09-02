
// Creating a unique ID function
function generateID() {

    const first = generateID_1();
    const second = generateID_1();

    const uniqueId = first + second;

    if (`${uniqueId}`.length < 12) uniqueId = (Date.now() % 1000000000000) + uniqueId;

    return uniqueId % 1000000000000;
} 

function generateID_1() {
    // Generate timestamp and random number:
    const time = Date.now();
    const first = Math.floor(time / 100000);
    const second = time % 100000;

    const randomNumber = Math.floor(Math.random() * 100000000001);

    // Merge both with string underscore (forces string)
    const uniqueId = (first + randomNumber) * second;

    // Make function return the result
    return uniqueId;
} 

function generateLibraryCardNumber() {

    const first = generateID_1();
    const second = generateID_1();

    let uniqueId = first + second;

    if (`${uniqueId}`.length < 12) uniqueId = (Date.now() % 1000000000000) + uniqueId;

    uniqueId = uniqueId % 1000000000000;

    let LibraryCardNumber = uniqueId.toString(16);

    while (LibraryCardNumber.length < 9) {
        LibraryCardNumber = `${LibraryCardNumber}${generateID().toString(16)}`;
    }

    return LibraryCardNumber.slice(0, 9).toUpperCase();
} 
