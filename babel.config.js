// const presets = [
//   ['@babel/preset-env', { // какой пресет использовать
//     targets: { // какие версии браузеров поддерживать
//       edge: '17',
//       ie: '11',
//       firefox: '50',
//       chrome: '64',
//       safari: '11.1'
//     },
//
//     использовать полифиллы для браузеров из свойства target
//     по умолчанию babel использует поллифиллы библиотеки core-js
//     useBuiltIns: "entry"
//   }]
// ];

//module.exports = { presets };

const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
