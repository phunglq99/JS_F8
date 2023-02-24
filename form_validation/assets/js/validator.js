// Object 'Validator
function Validator(options) {

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputEl, rule) {
        var errorMessage;
        var errorElement = inputEl.parentElement.querySelector(options.errorSelector);


        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc test
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputEl.value);
            if(errorMessage) break;
        }

        if(errorMessage) {
            errorElement.innerHTML = errorMessage;
            inputEl.parentElement.classList.add('invalid');
        } else {
            errorElement.innerHTML = '';
            inputEl.parentElement.classList.remove('invalid');
        }
    }

    // Lấy EL của form cần validate
    var formEl = document.querySelector(options.form);
    if(formEl) {
        options.rules.forEach(function(rule) {
            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputEl = formEl.querySelector(rule.selector);
            var errorElement = inputEl.parentElement.querySelector(options.errorSelector);

            if (inputEl) {
                // Xử lý trường hợp blur khỏi input
                inputEl.onblur = function () {
                    validate(inputEl, rule);
                    // console.log($('#form-1').children('.form-group').children('#password').val());
                }

                // Xử lý khi người dùng nhập vào input
                inputEl.oninput = function () {
                    errorElement.innerText = '';
                    inputEl.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

// Định nghĩa các rules
// Nguyên tắc của các rules
// 1. Khi có lỗi => Trả ra messae lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector : selector,
        test: function (val) {
            return val === getConfirmValue() ? undefined : message ||'Giá trị nhập vào không chính xác'
        }
    }
}