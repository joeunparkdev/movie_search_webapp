const autoSearchURL = "https://api.themoviedb.org/3/search/movie?language=ko-KR&query=";
let dataList = [];
const $search = document.querySelector("#search");
const $searchButton = document.querySelector("#search-button");
const $autoComplete = document.querySelector(".autocomplete-card .autocomplete");
let selectedAutoSuggestion = 0;

const fetchMovies = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API 요청이 실패했습니다. 응답 코드: ${response.status}`);
        }
        const data = await response.json();
        if (data.results) {
            dataList = data.results;
        } else {
            dataList = [];
        }
    } catch (error) {
        console.error('영화를 가져오는 중 오류가 발생했습니다:', error);
    }
};

// 자동완성 목록을 화면에 보여줌
const showList = (data, value, selectedAutoSuggestion) => {
    const regex = new RegExp(`(${value})`, "g");

    $autoComplete.innerHTML = data
        .map(
            (title, index) => `
            <div class="${selectedAutoSuggestion === index ? "active" : ""}">
                ${title.replace(regex, "<mark>$1</mark>")}
            </div>
        `
        )
        .join("");
};

// 자동완성 목록에서 항목을 선택
const handleSelection = (title) => {
    $search.value = title;
    $autoComplete.innerHTML = "";
};

// 검색 입력시
$search.onkeyup = async (event) => {
    const value = $search.value.trim();

    if (value.length > 0) {
        await fetchMovies(autoSearchURL + value);
    }

    const matchDataList = value
        ? dataList.map((movie) => movie.title).filter((title) => title.includes(value))
        : [];

    switch (event.keyCode) {
        case 38:
            selectedAutoSuggestion = Math.max(selectedAutoSuggestion - 1, 0);
            break;
        case 40:
            selectedAutoSuggestion = Math.min(selectedAutoSuggestion + 1, matchDataList.length - 1);
            break;
        case 13:
            $search.value = matchDataList[selectedAutoSuggestion] || "";
            selectedAutoSuggestion = 0;
            matchDataList.length = 0;
            $autoComplete.innerHTML = "";
            break;
        default:
            selectedAutoSuggestion = 0;
            break;
    }

    if (matchDataList.length > 0) {
        showList(matchDataList, value, selectedAutoSuggestion);

        const autoSuggestedItems = document.querySelectorAll(".autocomplete > div");
        autoSuggestedItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                handleSelection(matchDataList[index]);
                $autoComplete.innerHTML = ""; // 선택 후 자동완성 숨기기
            });
        });
    } else {
        $autoComplete.innerHTML = "";
    }
};

$searchButton.addEventListener("click", () => {
    $autoComplete.innerHTML = ""; // 검색 버튼 클릭 후 자동완성 숨기기
});
