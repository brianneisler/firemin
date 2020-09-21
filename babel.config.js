module.exports = {
  ignore: [/(node_modules)/],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        targets: {
          node: '8'
        },
        useBuiltIns: 'usage'
      }
    ]
  ]
}
