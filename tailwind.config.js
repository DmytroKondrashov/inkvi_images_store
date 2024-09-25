/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.pug', './src/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
