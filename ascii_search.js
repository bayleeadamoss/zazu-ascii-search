module.exports = (pluginContext) => {
  let symbolsRaw = require('./symbols')
  let symbols = Object.keys(symbolsRaw).map((key) => {
    let self = {
      key: key,
      value: symbolsRaw[key],
      character: String.fromCharCode(key),
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
        return self.key + " " + self.character
      },
      toZazuObj: () => {
        return {
          id: self.key,
          title: self.display(),
          subtitle: self.value,
          value: self.character,
        }
      }
    }
    return self
  })
  return (query) => {
    let words = query.split(' ');

    return new Promise((resolve, reject) => {

      let results = symbols.reduce((memo, item) => {
        var match = true;
        for (var i = 0, len = words.length; i < len && match; i++) {
           match = item.match(new RegExp("\\b"+words[i], 'i'));
        }
        if (match) {
          memo.push(item.toZazuObj())
        }
        return memo
      }, [])

      resolve(results)
    })
  }
}
