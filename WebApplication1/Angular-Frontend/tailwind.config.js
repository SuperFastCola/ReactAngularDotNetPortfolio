/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./src/**/*.scss",
  ],
  theme: {
     fontFamily: {
        'sans': ['Signika Negative','sans-serif']
      }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
