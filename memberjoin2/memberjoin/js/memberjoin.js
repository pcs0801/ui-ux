//전체 document 메모리 모두 로드가 되었을때 onLoad() 함수 call
function onLoad() {
  //id 패턴검색을 진행할 이벤트 정의
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[가-힣]{2,4}$|^[a-zA-Z]{4,11}$/;
  let nicknamePattern = /^[가-힣0-9a-zA-Z]{2,4}$|^[가-힣0-9a-zA-Z]{4,11}$/;
  let emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  let phoneNumPattern = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
  let birthdayPattern = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let pwCheck = document.querySelector("#pwCheck");
  let submit = document.querySelector("#submit");
  let name = document.querySelector("#name");
  let nickname = document.querySelector("#nickname");
  let email = document.querySelector("#email");
  let phoneNum = document.querySelector("#phoneNum");
  let birthday = document.querySelector("#birthday");
  let addrSearch = document.querySelector("#addrSearch");
  let zipcode = document.querySelector("#zipcode");
  let addr1 = document.querySelector("#addr1");

  id.addEventListener("blur", () => {
    validate(id, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.");
  });

  pw.addEventListener("blur", () => {
    validate(pw, pwPattern, "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요.");
  });

  name.addEventListener("blur", () => {
    validate(name, namePattern, "공백없이 한글, 영문만 입력 가능 (한글2자, 영문4자 이상)");
  });

  nickname.addEventListener("blur", () => {
    validate(nickname, nicknamePattern, "공백없이 한글, 영문, 숫자만 입력 가능 (한글2자, 영문4자 이상) 최대 11자");
  });

  email.addEventListener("blur", () => {
    validate(email, emailPattern, "특수문자 최대 1개 포함, @ 필수 입력, 대소문자 구분없음.");
  });
  
  phoneNum.addEventListener("blur", () => {
  validate(phoneNum, phoneNumPattern, "'-' 제외, 숫자만 입력.");
  });
  
  birthday.addEventListener("blur", () => {
  validate(birthday, birthdayPattern, "숫자 8자리로 입력(ex. 19900101)");
  });

  pwCheck.addEventListener("blur", () => {
    if (pw.value === pwCheck.value) {
      pwCheck.nextSibling.innerHTML = "패스워드 일치";
      pw.nextSibling.innerHTML = "";
      pwCheck.nextSibling.style.color = "blue";
    } else {
      pwCheck.nextSibling.innerHTML = "패스워드 불일치";
      pwCheck.nextSibling.style.color = "tomato";
      pwCheck.value = "";
      pwCheck.focus();
    }
  });

  //우편번호 이벤트처리
  addrSearch.addEventListener("click", () => {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
        if (data !== null && data !== undefined) {
          console.log('zipcode', data.zonecode);
          console.log('data.roadAddress', data.roadAddress);
          zipcode.value = data.zonecode;
          addr1.value = data.roadAddress;
        } else {
          addrSearch.nextSibling.innerHTML = "daum api 오류발생으로 직접입력바람";
          zipcode.focus();
        }
      }
    }).open();
  });



  //회원가입전송기능 점검
  submit.addEventListener("click", function () {
    //아이디
    let idReturn = validate(id, idPattern, "값을 정확하게 입력요청");
    if (idReturn === false) return;
    let pwReturn = validate(pw, pwPattern, "값을 정확하게 입력요청");
    if (pwReturn === false) return;
    let nameReturn = validate(name, namePattern, "값을 정확하게 입력요청");
    if (nameReturn === false) return;
    let nicknameReturn = validate(nickname, nicknamePattern, "값을 정확하게 입력요청");
    if (nicknameReturn === false) return;
    let emailReturn = validate(email, emailPattern, "값을 정확하게 입력요청");
    if (emailReturn === false) return;
    let phoneNumReturn = validate(phoneNum, phoneNumPattern, "값을 정확하게 입력요청");
    if (phoneNumReturn === false) return;
    let birthdayReturn = validate(birthday, birthdayPattern, "값을 정확하게 입력요청");
    if (birthdayReturn === false) return;
    //패스워드
    alert('서버에 전송');
    let form = document.querySelector("form");
    form.submit();
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

