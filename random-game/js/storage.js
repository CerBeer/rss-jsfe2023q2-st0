
function localStorage_init() {
    let bestgames = [];
    let keys = Object.keys(localStorage);
    if (keys.indexOf('bestgames') < 0) localStorage.setItem('bestgames', JSON.stringify(bestgames));
}

function localStorage_save_bestgames(bestgames) {
    localStorage.setItem('bestgames', JSON.stringify(bestgames));
}

function localStorage_read_bestgames() {
    const bestgames = JSON.parse(localStorage.bestgames);
    return bestgames;
}
