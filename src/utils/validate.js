/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  
  return true
}
/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**表单校验 */
// 校验qq
export const checkQQ = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("QQ不能为空"));
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error("请输入数字值"));
    } else {
      callback();
    }
  }, 100);
}

export const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
  if (!value) {
    return callback(new Error("电话号码不能为空"));
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error("请输入数字值"));
    } else {
      if (phoneReg.test(value)) {
        callback();
      } else {
        callback(new Error("电话号码格式不正确"));
      }
    }
  }, 100);
}

export const checkUsername = (rule, value, callback) => {
  const phoneReg = /^1[0-9]{9}$/;
  if (!value) {
    return callback(new Error("学号不存在"));
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error("请正确输入学号"));
    } else {
      if (phoneReg.test(value)) {
        callback();
      } else {
        callback(new Error("学号格式不正确"));
      }
    }
  }, 100);
}

export const checkEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!value) {
    return callback(new Error("邮箱不能为空"));
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的邮箱格式"));
    }
  }, 100);
}
