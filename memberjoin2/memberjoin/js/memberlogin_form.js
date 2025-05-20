//전체 document 메모리 모두 로드가 되었을때 onLoad() 함수 call
function onLoad() {
  //id 패턴검색을 진행할 이벤트 정의
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

  //공동으로 사용되는 함수
  function validate(inputObj, pattern, message) {
    if (inputObj.value.match(pattern)) {
      inputObj.nextElementSibling.innerHTML = "성공";
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

