const badWords = require('bad-words');
const filter = new badWords();

const blogValidator = (content, title) => {
    return new Promise( async (resolve, reject)=> {
        if(!content || content.length === 0) reject('empty blog')
        if(!title || title.length === 0) reject('empty title')
        if (filter.isProfane(title)) reject('Check the language abusive words found');
        if (filter.isProfane(content)) reject('Check the language abusive words found');
        resolve();
    })
}


module.exports = {blogValidator}