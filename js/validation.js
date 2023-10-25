function searchValidationCheck(value) {
    // 욕설 필터링
    for (let abuse of abuses) {
        if (value.includes(abuse)) {
            alert("욕설은 제외 해야 합니다.");
            return false;
        }
    }

    return true;
}

function commentValidationCheck(value) {
    // 글자수 필터링
    const textLength = value.length;
    if (textLength < 5 || textLength > 50) {
        alert("글자 수는 5~50자 입니다");
        return false;
    }

    // 욕설 필터링
    for (let abuse of abuses) {
        if (value.includes(abuse)) {
            alert("욕설은 제외 해야 합니다.");
            return false;
        }
    }

    return true;
}