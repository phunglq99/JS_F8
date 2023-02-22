
var courseAPI = "http://localhost:3000/courses";


function start() {
    getCourses(function(courses) {
        renderCourse(courses)
    });

    handleCreateForm()
}

start()

//Function
function getCourses(callback) {
    fetch(courseAPI)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseAPI, options) 
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(courseAPI + '/' + id, options) 
        .then(function(response) {
            return response.json()
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id)
            if(courseItem) {
                courseItem.remove();
            }
        })
}

// update a course
function hanldeUpdatecourse(id,data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseAPI + '/' + id, options) 
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}

function renderCourse(courses) {
    var listCourseBlock = document.getElementById("list-course");

    var htmls = courses.map(function(course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <h4>${course.descriptions}</h4>
                <button onclick="handleDeleteCourse(${course.id})">&times;</button>
                <button onclick="updateForm(${course.id})">update</button>
            </li>
        `
    })

    listCourseBlock.innerHTML = htmls.join("");
}

function updateForm(id) {
    getCourseById(id)
    var submitBtn = document.getElementById('submit');

    submitBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var descriptions = document.querySelector('input[name="descriptions"]').value;


        var formData = {
            name : name,
            descriptions:descriptions
        }

        hanldeUpdatecourse(id, formData, function() {
            getCourses(function(courses) {
                renderCourse(courses)
            });
        })

        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="descriptions"]').value = '';
    }

}

function getCourseById(id) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(courseAPI + "/" + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function(course) {
            var name = document.querySelector('input[name="name"]');
            var descriptions = document.querySelector('input[name="descriptions"]');

            name.value = course.name;
            descriptions.value = course.descriptions;
        })
}

function handleCreateForm() {
    var createBtn = document.getElementById("create");


    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var descriptions = document.querySelector('input[name="descriptions"]').value;

        var formData = {
            name : name,
            descriptions:descriptions
        }
        createCourse(formData, function() {
            getCourses(function(courses) {
                renderCourse(courses)
            });
        });
    }
}

