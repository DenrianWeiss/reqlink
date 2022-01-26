/* jshint esversion: 11 */

const md = require('markdown-it')

export function render(text) {
    let renderer = new md()
    return renderer.render(text)
}