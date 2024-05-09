const q = console.log;

let apiKey = "68c52ecf503e554b087c6ac485a073c2";

const apiUrl = `https://api.themoviedb.org/3/movie/157336?api_key=${apiKey}&append_to_response=videos`;

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  q(data);
}

let itemNum = 0;
const container = document.getElementById("container");
const searchText = document.getElementById("searchText");

searchText.onchange = (event) => {
  if (searchText.value !== "") {
    search(searchText.value);
  }
};

function textTo(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] == " ") {
      result += "+";
    } else {
      result += text[i];
    }
  }
  return result;
}

async function search(text) {
  let apiUrl = `https://api.themoviedb.org/3/search/movie?query=${textTo(
    text
  )}&api_key=68c52ecf503e554b087c6ac485a073c2`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  itemNum = 0;
  container.innerHTML = "";
  data.results.forEach((element) => {
    addItem(element);
  });
}

const addItem = (element) => {
  itemNum += 1;
  const newItem = document.createElement("div");
  newItem.id = `item${itemNum}`;
  newItem.classList = "item";

  if (element.vote_average > 7) {
    newItem.innerHTML = `<img id="img${itemNum}" src="https://image.tmdb.org/t/p/w300/${element.poster_path}" alt="Filter!">
    <div class="info">
        <div id="title${itemNum}" class="title">
            ${element.original_title}
        </div>
        <div id="score${itemNum}" class="score1">
            ${element.vote_average}
        </div>
    </div>
    <div class="discription">
       ${element.overview}
    </div>`;
  } else {
    newItem.innerHTML = `<img id="img${itemNum}" src="https://image.tmdb.org/t/p/w300/${element.poster_path}" alt="Filter!">
    <div class="info">
        <div id="title${itemNum}" class="title">
            ${element.original_title}
        </div>
        <div id="score${itemNum}" class="score">
            ${element.vote_average}
        </div>
    </div>
    <div class="discription">
       ${element.overview}
    </div>`;
  }
  container.appendChild(newItem);
};

async function landingData() {
  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGM1MmVjZjUwM2U1NTRiMDg3YzZhYzQ4NWEwNzNjMiIsInN1YiI6IjY2M2JhZTI1ZWMyYzBhNDFjNjYzZWRlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PSQLQIWxj1bq1v63CCJcE9GqV3ShYLJmc__iZYCLH8Q",
        accept: "application/json",
      },
    }
  );
  const data = await response.json();

  data.results.forEach((element) => {
    addItem(element);
  });

  q(data.results);
}

landingData();
// getData();
// q(textTo("payam mohajerin"));
// search(" ");
