const {delta} = require("./money-flow.js")

for(let i = 0; i < 500000; i += 1000) console.log(i + "," + delta(i))

