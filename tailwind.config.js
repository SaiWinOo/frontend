/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    important : true,
    content: [
        "./index.html",
        "./src/**/*.{js,vue,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js"

    ],
  theme: {
    extend: {
        colors : {
            primary: '#f3f4f6',
            secondary: '#EFAF00',
            buttonHover: '#EFAF0099'
        }
    },
  },
  plugins: [
      require('flowbite/plugin')
  ],
}
