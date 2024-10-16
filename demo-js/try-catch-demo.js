let string = '{ "num1" : 1 }';

try {
    // username;
    let json = JSON.parse(string);

    if(!json.name){
        throw new SyntaxError("입력 값에 이름이 없습니다.")
    } else {
        console.log(json.name); // js 입장에선 에러가 아니지만, 우리 입장에선 에러! = 입력값이 잘못된 에러
    }

    let name = json.name;
    console.log(name);
} catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err);
}