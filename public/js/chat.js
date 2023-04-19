const socket = io();

function scrollToBottom() {
    const message = document.querySelector('#messages').lastElementChild;
    message.scrollIntoView();
}

socket.on('connect', () => {
    const params = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ')+ '"}');
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    })
})

socket.on('updateUserList', function (users) {
    const ol = document.createElement('ol');

    users.forEach(function (user) {
        const li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li);
    })
    const userList = document.querySelector('#users');
    userList.innerHTML = '';
    userList.appendChild(ol);
})

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAd).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#messages').appendChild(div);
    scrollToBottom()
})

socket.on('newLocationMessage', function (message) { //locationMessage
    const formattedTIme = moment(message.createdAt).format('LT');
    const template = document.querySelector('#messageLocation-template').innerHTML;
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTIme
    })
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('#messages').append(div);
    scrollToBottom()
})

document.querySelector('#submit-btn').addEventListener('click', function (event) {
    event.preventDefault();
    socket.emit('createMessage', {
        text: document.querySelector('input[name="message"]').value
    }, function () {
        //не  заполнил.  Это callback я вкурсе
    })
    document.querySelector('input[name="message"]').value = ''
})

document.querySelector('#send-location').addEventListener('click', function (event) {
    if (!navigator.geolocation) {
        return alert('Geolocation non.')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function () {
        alert('Unable non')
    });
})
