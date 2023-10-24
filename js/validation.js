const abuseURL = "https://blog.kakaocdn.net/dn/o8jTC/btrerzoVaaI/OiKT6hhdON0BCnVFY3kYQK/fword_list.txt?attach=1&knm=tfile.txt";

let abuses;

async function loadAbuse() {
    const response = await fetch(abuseURL);
    const responseText = await response.text();

    abuses = responseText.split("\n");
}

function searchValidationCheck(value) {
    // 욕설 필터링
    for (let abuse of abuses) {
        if (value.includes(abuse)) {
            alert("욕설은 제외 해야 합니다.");
            return false;
        }
    }
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
}

loadAbuse();