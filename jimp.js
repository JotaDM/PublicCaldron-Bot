const jimp = require('jimp')

let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
let mask = await jimp.read('mascara.png')
let fundo = await jimp.read('fundo.png')


jimp.read(member.use.defaultAvatarURL).then(avatar =>{
avatar.resize(130, 130)
mask.resize(130, 130)
avatar.mask(mask)
fundo.print(fonte, 170, 175, 'a')
fundo.composite(avatar,40, 90).write('beta.png')
})