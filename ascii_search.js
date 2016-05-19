const argument = process.argv.slice(-1)[0]

const _ = require('lodash');

const symbols_raw = require('./symbols.json')

var symbols = _.reduce(symbols_raw, function(memo, value, key) {
  (memo['items'] || (memo['items'] = [])).push({
    "key": key,
    "value": value,
    "match": function(regex) {
      return this.key.match(regex) || this.value.match(regex);
    },
    "illegal_char": function() {
      return _.inRange(this.key, 0, 9) || _.inRange(this.key, 11, 32);
    },
    "display": function() {
      if (this.illegal_char()) {
        return this.key + " - " + this.value
      } else {
        return this.key + " &#" + this.key + ";"
      }
    },
    "to_zazu_obj": function() {
      return {
        title: this.display(),
        subtitle: this.value,
        value: this.key,
      };
    }
  });
  return memo;
}, {});

try {
  var results = _.map(symbols['items'], function(item){
    return item.to_zazu_obj();
  });

  console.log(
    JSON.stringify(
      results
    )
  )
} catch (e) {
  console.log(JSON.stringify([
    {
      title: '...',
      subtitle: 'No results found.',
      value: -1,
    },
  ]))
}

