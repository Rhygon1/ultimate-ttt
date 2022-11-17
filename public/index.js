let grid = document.querySelector('.grid')

for(let i = 0; i<9; i++){
    let sub = document.createElement('div')
    sub.classList.add('subgrid')
    sub.id = `${i}`
    for(let j = 0; j < 9; j++){
        let node = document.createElement('div')
        node.classList.add('node')
        node.id = `${j}`
        sub.appendChild(node)
    }
    grid.appendChild(sub)
}

let selectedType = 'X'

document.querySelectorAll('.typeButton').forEach(button => { // intialises the correct borders for the buttons
    if(button.textContent.toUpperCase() == selectedType) button.style.borderColor = "bisque"
})

document.querySelectorAll('.typeButton').forEach(button => { // checks for button clicks on the node type buttons and sets the var accordingly
    button.addEventListener('click', () => {
        document.querySelectorAll('.typeButton').forEach(button2 => button2.style.borderColor = "black")
        button.style.borderColor = "white"
        selectedType = button.textContent.toUpperCase()
    })
})

let socket = io('/')
socket.on('set', game => {
    game.forEach((grid, idx) => {
        grid.forEach((tile, idx2) => {
            let node = document.querySelector(`.grid .subgrid:nth-child(${idx+1}) .node:nth-child(${idx2+1})`)
            node.innerText = tile == 'EMPTY' ? '' : tile
        })
    })
})

document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', () => {
        socket.emit('change', [Number(node.parentElement.id), Number(node.id)], selectedType)
    })
})