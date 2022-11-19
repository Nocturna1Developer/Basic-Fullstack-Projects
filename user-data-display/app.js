let data = [
    {
        name: 'Matero',
        age: '37',
    },
    {
        name: 'Bob',
        age: '30',
    },
    {
        name: 'Sal',
        age: '34',
    },
    {
        name: 'Joe',
        age: '36',
    },
    {
        name: 'Murr',
        age: '33',
    },
    {
        name: 'Q',
        age: '35',
    }
]

const info = document.querySelector('#info')

// All of our content data goes here <div id="info"> HERE! </div> in index.html
let details = data.map(function (item) {
    return (
        '<div>' + item.name + ', ' + item.age + '</div>'
    )
})

info.innerHTML = details.join('\n')