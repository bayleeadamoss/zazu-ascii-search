module.exports = {
  name: 'zazu-ascii-search',
  version: '0.0.1',
  author: 'TinyTacoTeam',
  description: 'Search for ASCII characters by name or by number.',
  icon: 'icon.png',
  homepage: 'https://github.com/tinytacoteam/zazu-ascii-search',
  git: 'git@github.com:tinytacoteam/zazu-ascii-search.git',
  blocks: {
    input: [
      {
        id: 1,
        type: 'PrefixScript',
        prefix: 'asc',
        space: true,
        args: 'Required',
        script: 'node ascii_search.js {query}',
        connections: [2]
      },
    ],
    output: [
      {
        id: 2,
        type: 'CopyToClipboard',
        text: '{value}',
      },
    ],
  },
}
