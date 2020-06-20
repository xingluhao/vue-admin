/**
 * 过滤特殊字符
 * @param s
 * @returns {string}
 */

export function stripscript(s) {
    var pattern = new RegExp("[` ~!%@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 * @param username
 * @returns {boolean}
 */
export function valiDateEmal(username) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(username)
}

/**
 * 密码验证
 * @param password
 * @returns {boolean}
 */
export function valiDatePoss(password) {
    let reg = /^(?!\D+$)(?![a-zA-Z]+$)\S{6,20}$/
    return reg.test(password)
}
