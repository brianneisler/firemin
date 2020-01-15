module.exports = {
  ignore: [/(node_modules)/],
  plugins: [['@babel/plugin-proposal-object-rest-spread']],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage'
      }
    ]
  ]
}
