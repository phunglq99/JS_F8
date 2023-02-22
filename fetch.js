/* API (URL)-> Application programing interface
- Cổng giao tiếp giữa các phần mềm
- Backend -> API -> Fetch -> JSON/XML
-> JSON.parse -> Javascript types
-> Render ra giao diện với HTML
*/

var postAPI = 'https://jsonplaceholder.typicode.com/posts';

//stream
fetch(postAPI)
    .then(function(response) {
        return  response.json(); //promise
        // JSON.parse: JSON -> JS tyoes
    })
    .then(function(posts) {
        var htmls = posts.map(function(post) {
            return `<li>
                <h2>${post.title}</h2>
                <h2>${post.body}</h2>
            </li>`
        })
        var html = htmls.join('');
        document.getElementById('comment-block').innerHTML = html;
    })
    .catch(function(err) {
        console.log('Có lỗi!');
    })