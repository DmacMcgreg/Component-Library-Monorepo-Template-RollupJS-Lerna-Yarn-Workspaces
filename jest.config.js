const path = require('path')
const mocks = path.resolve('__mocks__')

module.exports = {
  rootDir: path.resolve('packages'),
  roots: ['<rootDir>'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": path.resolve('__mocks__/fileMock.js'),
    "\\.(css|scss|less)$": path.resolve('__mocks__/styleMock.js'),
    "\\.(svg)$": path.resolve('__mocks__/svgMock.js')
  },
  transform: { "^.+\\.jsx?$": "babel-jest" }
}
