const query = new RegExp(process.argv.slice(-1)[0], 'i')
const symbolsRaw = require('./symbols.json')

const symbols = Object.keys(symbolsRaw).map((key) => {
  const self = {
    key: key,
    value: symbolsRaw[key],
    match: (regex) => {
      return self.key.match(regex) || self.value.match(regex)
    },
    illegalChar: () => {
      if (self.key >= 0 && self.key <= 9) return true
      if (self.key >= 11 && self.key <= 32) return true
      return false
    },
    display: () => {
      if (self.illegalChar()) {
        return self.key + " - " + self.value
      }
      return self.key + " &#" + self.key + ";"
    },
    toZazuObj: () => {
      return {
        id: self.key,
        title: self.display(),
        subtitle: self.value,
        value: self.key,
      }
    }
  }
  return self
})

const results = symbols.reduce((memo, item) => {
  if (item.match(query)) {
    memo.push(item.toZazuObj())
  }
  return memo
}, [])

console.log(
  JSON.stringify(
    results
  )
)
