/**
 * @module helpers/rando
 */
function rando(arr) {
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}

export {
    /**
     * @module helpers/rando
     * This generates a random number for selecting a tweet in the array.
     * @function rando
     * @param {number} arr - Max number the rando number returned can be.
     * @returns {number} A number between 0 and arr. 
     */
    rando
}