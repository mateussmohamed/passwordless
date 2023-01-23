module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  useTabs: false,
  tailwindConfig: './tailwind.config.js',
  plugins: [require('prettier-plugin-tailwindcss')],
  pluginSearchDirs: false
}
