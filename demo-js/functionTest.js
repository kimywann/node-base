// 함수 선언문
function foo(arg) {
    console.log('foo');
}

foo();

// 함수 표현식
const foo2 = function(arg) {
    console.log('foo2');
}

foo2();

// Function 생성자 함수
const foo3 = new Function("console.log('foo3')");

foo3();

// 화살표 함수 표현식
const foo4 = () => {
    console.log('foo4');
}

foo4();