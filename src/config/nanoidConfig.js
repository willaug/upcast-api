require('dotenv').config()

const { customAlphabet } = require('nanoid')
const alphabet = process.env.NANOID_alphabet

module.exports = NanoIDLength => customAlphabet(alphabet, NanoIDLength)
