function onLoad() {
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");

  id.addEventListener("blur", () => {
    validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.");
  });

  pw.addEventListener("blur", () => {
    validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.");
  });

  function validate(inputObj, pattern, message) {
    if (inputObj.value.match(pattern)) {
      inputObj.nextElementSibling.innerHTML = "정상";
      inputObj.nextElementSibling.style.color = "blue";
      return true;
    } else {
      inputObj.nextElementSibling.innerHTML = message;
      inputObj.nextElementSibling.style.color = "tomato";
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  }
}

function checkLoginRadio() {
  let selected = document.querySelector('input[name="memberType"]:checked');
  if (!selected) {
    alert("회원 또는 비회원을 선택해주세요.");
    return;
  }

  alert("로그인 완료");
}