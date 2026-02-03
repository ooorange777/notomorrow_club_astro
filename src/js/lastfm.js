function lastfmRss(url, name) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const topAlbums = JSON.parse(xhr.responseText);
      for (let i = 0; i < 10; i++) {
        let title = topAlbums.topalbums.album[i].name + "·" + topAlbums.topalbums.album[i].artist.name;
        let link = topAlbums.topalbums.album[i].url;
        let img = String(topAlbums.topalbums.album[i].image[1]["#text"]);
        let titleElement = document.createElement("p");
        let linkElement = document.createElement("a");
        let imgElement = document.createElement("img");
        let itemContainer = document.createElement("div");
        document.querySelector(name).appendChild(itemContainer);
        titleElement.textContent = title;
        linkElement.setAttribute("href", link);
        linkElement.setAttribute("target", "_blank");
        imgElement.setAttribute("src", img);
        imgElement.setAttribute("class", "w-20");
        titleElement.setAttribute("class", "mt-5");
        itemContainer.appendChild(imgElement);
        itemContainer.appendChild(linkElement);
        linkElement.appendChild(titleElement);
      }
    }
  };
  xhr.send();
}
const lastfmApi = "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=ooorange777&api_key=e571ab0f73e78879086dd7ef557a4c26&period=1month&limit=10&format=json";
const lastfmId = "#lastfm";
lastfmRss(lastfmApi, lastfmId);