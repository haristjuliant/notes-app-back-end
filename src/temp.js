/**
 *      for understanding Spread Operator
 */

let notes = [
    {
        title: 'bacaan A',
        tags: ['bumi', 'venus'],
        body: 'jika memang hanya manusia yang bisa mengerjakan itu semua, maka aku sebagai makhluk lain akan menyerah',
        updateAt: 01012022,
    },
    {
        title: 'bacaan B',
        tags: ['tagB2', 'tagB1'],
        body: 'ini isi bacaan dari B',
        updateAt: 02012022,
    },
    {
        title: 'bacaan C',
        tags: ['tagC2', 'tagC1'],
        body: 'ini cainsdcsacascac',
        updateAt: 03012022,
    },
];

const notes2 = {
    title: 'judul baru',
    tags: 'tags baru',
    body: 'body baru',
    updateAt: 10072022
}
const {title, tags, updateAt} = notes2

let temp = [ 
    {apel:1, jeruk:2},
    {mangga:3, anggur:4},
]

const index = 1

notes[1] = {
    ...notes[1],
    title
};

// console.log(notes[1])
console.log(notes)
notes.splice(2,1)
console.log(notes)