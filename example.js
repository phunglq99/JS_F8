var users = [
    {
        id: 1,
        name: 'Kien Dam'
    },
    {
        id: 2,
        name: 'Son Dang'
    },
    {
        id: 3,
        name: 'Hung Dam'
    }
    // .....
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh Son chua ra video :('
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vua ra xong em oi!'
    },
    {
        id: 3,
        user_id: 2,
        content: 'Ok khong em'
    }
]

// 1. Lấy comments
// 2. Từ comments lấy ra user_id, từ user_id lấy ra user tương ứng

// Fake API

function getComments() {
    return new Promise(
        function(resolve, reject) {
            setTimeout(function() {
                resolve(comments);
            })
        }
    );
}

function getUserById(userId) {
    return new Promise(
        function(resolve, reject) {
            setTimeout(function() {
                var user = users.filter(function(user) {
                    return userId.includes(user.id)
                })
                resolve(user);
            },1000)
        }
    )
}

getComments()
    .then(function(comment) {
        var userID = comment.map(function(user) {
            return user.user_id
        })
        return getUserById(userID)
                    .then(function(users) {
                        return {
                            users : users,
                            comments : comment
                        }
                    });
    })
    .then (function(data) {
        var commentBlock = document.getElementById('comment-block');

        var html ='';

        data.comments.forEach(function(comment) {
            var user = data.users.find(function(user) {
                return user.id === comment.user_id
            })

            html += `<li>${user.name}: ${comment.content}</li>`
        })
        commentBlock.innerHTML = html
    })



