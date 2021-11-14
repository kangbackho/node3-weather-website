console.log('clinent side javascript')

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data2) => {
//         if(data2.error){
//             console.log('can not find location .... try again....')
//         }else{

//             console.log(data2.location)
//             console.log(data2.temperature[0])

//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        messageOne.textContent = ''

        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data2) => {
                if(data2.error){
                    messageOne.textContent = data2.error
                    messageTwo.textContent = data2.error
                    console.log(data2.error)
                }else{

                    messageOne.textContent = data2.location
                    messageTwo.textContent = data2.location + '의 온도는 현재 ' + data2.temperature.temperature + '입니다'

                    console.log(data2.location)
                    console.log(data2.location + '의 온도는 현재 ' + data2.temperature.temperature + '입니다')

                }
            })
    })
})