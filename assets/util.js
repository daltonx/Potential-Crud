function createElement(tagName, options) {
    const element = document.createElement(tagName)
    for(const attribute in options) {
        if(attribute in element) {
            element[attribute] = options[attribute]
        } else {
            element.setAttribute(attribute, options[attribute])
        }                
    }
    return element
}

//<TABLE UTIL>
function listRow(collumns) {
    const tr = createElement('tr')
    for(const collumn of collumns) {
        tr.appendChild(createElement('td', {
            innerHTML: collumn
        }))
    }
    return tr
}

function rowBtns(btns) {
    return btns.map(({ data_id, action, text, type = 'primary' }) => {
        return createElement('button', {
            data_id,
            btn_action: action,
            className: `btn btn-${type} mr-1`,
            innerHTML: text
        }).outerHTML
    }).join('')
}

function emptyTable(message) {
    const tr = createElement('tr')
    tr.appendChild(createElement('td', {
        innerHTML: message,
        colSpan: 10,
        className: 'text-center'
    }))
    return tr
}

async function fetchTableData({ route, element, rowProcessor, emptyMsg = 'Sem dados', actions }) {
    const tableBody = document.querySelector(`#${element} tbody`)
    const result = await fetch(route)
    if(result.status != 200) return tableBody.innerHTML = emptyTable(emptyMsg).innerHTML
    const json = await result.json()

    if(actions && !tableBody.onclick) tableBody.onclick = e => {
        const { target } = e
        const action = target.getAttribute('btn_action')
        if(action && action in actions) actions[action](target)
    }
    
    tableBody.innerHTML = json.length ? '' : emptyTable(emptyMsg).innerHTML
    for(const row of json) {
        tableBody.appendChild(listRow(rowProcessor(row)))
    }
}
//</TABLE UTIL>

function getFormData(fields) {
    return Array.from(fields).reduce((obj, input) => {
        return {
            ...obj,
            [input.id]: input.value || ''
        }
    },{})
}

function toQuery(obj) {
    return Object.entries(obj).map(([ key, value]) => `${key}=${value}`).join('&')
}

function maskInput(input) {
    const masks = input.getAttribute('mask').split(';').sort((x, y) => x.length - y.length)
    input.addEventListener('keyup', e => {
        const digits = input.value.match(/\d+/g)?.join('')
        if(!digits) return
        let value = ''
        let digit = 0
        const [ mask ] = masks.filter((mask, index, array) => 
            index + 1 == array.length || mask.match(/\d+/g).join('').length >= digits.length
        )
        for(let i = 0; i < mask.length; i++) {
            if(mask[i] == 9) {
                if(digits[digit] == undefined) break
                value += digits[digit]
                digit++
            } else {
                if(digits[digit] == undefined) break
                value += mask[i]
            }
        }
        input.value = value
    })
}