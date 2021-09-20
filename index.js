// https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=stiv0jobs&gsrlimit=20&prop=pageimages%7Cextracts&exchars=100&exintro&explaintext&exlimit=max&format=json&origin=*

let searchFormElement = document.querySelector("form.search");
let searchInputElement = searchFormElement.querySelector("input#searchBar");
let searchBtn = searchFormElement.querySelector("i#searchbtn");
let resultsElement = document.querySelector("ul.search-results");

searchFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    let searchValue = searchInputElement.value.trim();
    if (searchValue) {
        await searchData(searchValue);
    }
});

let data;

async function searchData(searchValue) {
    let url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchValue}&format=json&origin=*`;

    url = encodeURI(url);

    let response = await fetch(url);

    response = await response.json();

    if (!response.query) {
        handleError();
    } else {
        renderResults(response.query.pages);
    }
}

function renderResults(results) {
    resultsElement.innerHTML = "";

    for (let result in results) {
        result = results[result];
        console.log(result);
        let description = result.thumbnail
            ? `<div>
        <img src="${result.thumbnail.source}" width="${result.thumbnail.width}" height="${result.thumbnail.height}" alt="" />
        <p>
            lorem ipsum dolor sit amet
        </p>
    </div>`
            : `<p>
    lorem ipsum dolor sit amet
</p>`;

        let newSearchResult = `<li class="${result.thumbnail ? "img" : ""}">
            <h2>
                <a href="#">${result.title}</a>
                ${description}
            </h2>
        <li>`;

        resultsElement.innerHTML += newSearchResult;
    }
}
