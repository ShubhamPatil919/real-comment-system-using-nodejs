    let username
    let socket = io()
    do {
        username = prompt("Enter Your Name :")
    } while (!username)

    const textarea = document.querySelector("#textarea")
    const submitBtn = document.querySelector("#submitBtn")
    const commentBox = document.querySelector('.comment__box')

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        let comment = textarea.value
        if (!comment) {
            return
        }
        postComment(comment)
    })

    function postComment(comment) {
        //Append with dom
        let data = {
            username: username,
            comment: comment
        }
        appendToDom(data)
        textarea.value = ""

        //Broadcast Comment
        broadcastComment(data)

    }

    function appendToDom(data) {
        let lTag = document.createElement('li')
        lTag.classList.add('comment', 'mb-3')

        let markup = `<div class="card border-light mb-3">
        <div class="card-body">
            <h6>${data.username}</h6>
            <p>${data.comment}</p>
            <div>
                <imp src="/images/clock.png" alt="clock">
            </div>
        </div>
    </div>`

        lTag.innerHTML = markup
        commentBox.prepend(lTag)
    }


    function broadcastComment(data) {
        //Socket
        socket.emit('comment', data)
    }

    socket.on('comment', (data) => {
        appendToDom(data)
    })