const randomWords = require('random-words')

export function getRandomWord(): string{
    return randomWords({exactly: 1})[0];
}