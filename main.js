/* 1: Sync / Async
    + Sync: Đồng bộ
    + Async: Bất đồng bộ
        * setTimeout
        * setInterval
        * fetch
        * XMLHttpRequest
        * File reading
        * Request animation frame
    - Callback: để xử lý tất cả thao tác bất đồng bộ trên

// sleep
setTimeout(function() {
    console.log(1);
},1000)

console.log(2);
*/

/*2: Callback hell:

setTimeout(function() {
    console.log(1);
    setTimeout(function() {
        console.log(2);
        setTimeout(function() {
            console.log(3);
            setTimeout(function() {
                console.log(4);
            },1000)
        },1000)
    },1000)
}, 1000);

*/

/* Promise: là khái niệm sinh ra để giúp xử lý các thao tác Async và trước khi có 'Promise' thì sử dụng 'Callback'
nhưng có vấn đề là nó xảy ra 'Callback hell' gây ra khó nhìn và rối rắm nên sử dụng Promise để khắc phục
- Để tạo ra  Promise sử dụng từ khóa 'new' và trong constructor của nó truyền vào 1 'Executor'
- Khi Executor thực thi thì ta nhận được 2 tham só là :
    + resolve
    + reject

- 3 Trạng thái khi start: 
    + Pendding
    + Fulfilled
    + Rejected

// VD
var promise = new Promise(
    // Executor
    function(resolve, reject) {
        // logic
        // Thành công: resolve()
        // Thất bại: reject()

        // Fake call API
        resolve();
    }
);

promise
    .then(function() {
        return new Promise(function (resolve) {
            setTimeout(() => {
                resolve([1,2,3])
            }, 3000);
        });
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error) {
        console.log(error);
    })
    .finally (function() {
        console.log("Done");
    })

// --------------------------------------------------------
function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    })
}

sleep(1000)
    .then(function() {
        console.log(1);
        return sleep(1000);
    })
    .then(function() {
        console.log(2);
        return sleep(1000);
    })
    .then(function() {
        console.log(3);
        return sleep(1000);
    })
    .finally (function() {
        console.log("Done");
    })
*/

// --------------------------------------------------------
var promise1 = new Promise(
    function(resolve, reject) {
        setTimeout(function() {
            resolve([1])
        },2000)
    }
)

var promise2 = new Promise(
    function(resolve, reject) {
        setTimeout(function() {
            resolve([2,3])
        },5000)
    }
)

Promise.all([promise1,promise2])
    .then(function([result1, result2]) {
        console.log(result1.concat(result2));
    })
    .catch(function(err) {
        console.log(err);
    })




