const repos = [
  {
    rssUrl: "https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/ooorange/rss",
    rssName: "#letterboxd",
  },
  {
    rssUrl: "https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/129150376?shelf=read",
    rssName: "#goodreads",
  },
];
function rss(rssUrl, rssName) {
  const rssXhr = new XMLHttpRequest();
  rssXhr.open("GET", rssUrl);
  rssXhr.onreadystatechange = () => {
    if (rssXhr.readyState === 4) {
      const rssContent = JSON.parse(rssXhr.responseText);
      for (let i = 0; i < 10; i++) {
        let rssTitle = rssContent.items[i].title;
        let rssLink = rssContent.items[i].link;
        let patt1 = /<img.*?src="(.*?)".*?\/?>/gi;
        let patt2 = /http.*?jpg/gi;
        let rssImgLink = String(rssContent.items[i]["content"].match(patt1));
        let rssImg = rssImgLink.match(patt2);
        let rssTitleElement = document.createElement("p");
        let rssLinkElement = document.createElement("a");
        let rssImgElement = document.createElement("img");
        let itemContainer = document.createElement("div");
        document.querySelector(rssName).appendChild(itemContainer);
        rssTitleElement.textContent = rssTitle;
        rssLinkElement.setAttribute("href", rssLink);
        rssLinkElement.setAttribute("target", "_blank");
        rssImgElement.setAttribute("src", rssImg);
        rssImgElement.setAttribute("class", "w-20");
        rssTitleElement.setAttribute("class", "mt-5");
        itemContainer.appendChild(linkElement);
        rssLinkElement.appendChild(rssImgElement);
        itemContainer.appendChild(rssTitleElement);
      }
    }
  };
  rssXhr.send();
}
for (let i = 0; i < repos.length; i++) {
  rss(repos[i]["rssUrl"], repos[i]["rssName"]);
}

function lastfmRss(lastfmUrl, lastfmName) {
  const lastfmXhr = new XMLHttpRequest();
  lastfmXhr.open("GET", lastfmUrl);
  lastfmXhr.onreadystatechange = () => {
    if (lastfmXhr.readyState === 4) {
      const topAlbums = JSON.parse(lastfmXhr.responseText);
      for (let i = 0; i < 10; i++) {
        let lastfmTitle = topAlbums.topalbums.album[i].name + "·" + topAlbums.topalbums.album[i].artist.name;
        let lastfmLink = topAlbums.topalbums.album[i].url;
        let lastfmImg = String(topAlbums.topalbums.album[i].image[1]["#text"]);
        let lastfmTitleElement = document.createElement("p");
        let lastfmLinkElement = document.createElement("a");
        let lastfmImgElement = document.createElement("img");
        let itemContainer = document.createElement("div");
        document.querySelector(lastfmName).appendChild(itemContainer);
        lastfmTitleElement.textContent = lastfmTitle;
        lastfmLinkElement.setAttribute("href", lastfmLink);
        lastfmLinkElement.setAttribute("target", "_blank");
        lastfmImgElement.setAttribute("src", lastfmImg);
        lastfmImgElement.setAttribute("class", "w-20");
        lastfmTitleElement.setAttribute("class", "mt-5");
        itemContainer.appendChild(lastfmImgElement);
        itemContainer.appendChild(lastfmLinkElement);
        lastfmLinkElement.appendChild(lastfmTitleElement);
      }
    }
  };
  lastfmXhr.send();
}
const lastfmApi = "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=ooorange777&api_key=e571ab0f73e78879086dd7ef557a4c26&period=1month&limit=10&format=json";
const lastfmId = "#lastfm";
lastfmRss(lastfmApi, lastfmId);
