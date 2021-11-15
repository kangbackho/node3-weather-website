console.log('clinent side javascript')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        messageOne.textContent = ''

        fetch('/weather?address=' + location).then((response) => {
            response.json().then((data2) => {
                if(data2.error){
                    messageOne.textContent = 'cannot find location..try other country...'
                    messageTwo.textContent = 'cannot find location..try other country...'
                    console.log(data2.error)
                }else{

                    messageOne.textContent = data2.location + '은' + data2.temperature.wetherDescription
                    messageTwo.textContent = data2.location + '의 온도는 현재 ' + data2.temperature.temperature + '입니다'
                    messageThree.textContent = data2.location +'의 습도는 현재' + data2.temperature.humidity + '입니다'
                    console.log(data2.location)
                    console.log(data2.location + '의 온도는 현재 ' + data2.temperature.temperature + '입니다')

                }
            })
    })
})