module.exports = (pluginContext) => {
  let symbolsRaw = require('./symbols')
  let symbols = Object.keys(symbolsRaw).map((key) => {
    let self = {
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
          value: String.fromCharCode(self.key),
        }
      }
    }
    return self
  })
  return (query) => {
    let rquery = new RegExp(query, 'i')

    return new Promise((resolve, reject) => {

      let results = symbols.reduce((memo, item) => {
        if (item.match(rquery)) {
          memo.push(item.toZazuObj())
        }
        return memo
      }, [])

      resolve(results)
    })
  }
}
