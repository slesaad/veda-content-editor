export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
        modules: false,
        loose: false,
        bugfixes: true,
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: true,
        absoluteRuntime: false,
        version: '^7.28.0'
      }
    ]
  ],
  // Don't inline helpers
  assumptions: {
    setPublicClassFields: true
  }
};