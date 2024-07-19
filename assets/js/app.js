const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const song = document.getElementById("song");
const btnPlay = $(".play__inner");
const appMusic = $(".app-music");
const listMusic = $(".listmusic");
const music = $(".music");
const nextSongBtn = $(".music-forward");
const prevSongBtn = $(".music-back");
const durationTime = $(".duration");
const remainingTime = $(".remaining");
const rangeBar = $(".range");
const nameTitle = $(".music__name");
const nameAuthor = $(".music__author");
const imgSong = $(".music__thumb img");
const imgThumb = $(".music__thumb");
const rangeVolume = $(".range-volume");
const turnOffVolume = $(".volume-icon");
const wave = $(".wave");
const category = $(".music-category");
rangeVolume.max = 100;
rangeVolume.value = 100;

const app = {
  listSong: [
    {
      id: 1,
      title: "Some thing just like this x 红色高跟鞋",
      author: "Terry Zhong",
      path: "TerryZhongMashupDouyinMusic.mp3",
      image: "6.jpg",
    },
    {
      id: 2,
      title: "Đau ở đây này",
      author: "Nal",
      path: "dauodaynay.mp3",
      image: "2.jpg",
    },
    {
      id: 3,
      title: "Chạnh lòng thương cô 2 remix",
      author: "Huy vạc",
      path: "chanhlongthuongco2.mp3",
      image: "3.jpg",
    },
    {
      id: 4,
      title: "Pháo hồng",
      author: "Đạt Long Vinh",
      path: "phaohong.mp3",
      image: "4.jpg",
    },
    {
      id: 5,
      title: "Sweet But Psycho Lyrics",
      author: "Ava Max",
      path: "SweetbutPsychoLyrics.mp3",
      image: "5.jpg",
    },
    {
      id: 6,
      title: "Về Bên Anh「Lofi Ver.」",
      author: "Jack x Mihle",
      path: "VeBenAnhLofiVer.mp3",
      image: "7.jpg",
    },
  ],

  currentVolume: 1,
  isPlaying: false,
  isTurnOffVolume: false,
  indexSong: 0,
  isDisplay: false,
  render: function () {
    const _this = this;
    const htmls = this.listSong.map((songs, index) => {
      return `
            <li class="music-item ${
              index === _this.indexSong ? "active" : ""
            }" data-index=${index}>
            <div class="music-item-img">
                <img src="./assets/img/${songs.image}" alt="">
            </div>
            <div class="music-item-info">
                <h3 class="music-item-name">${songs.title}</h3>
                <h4 class="music-item-author">${songs.author}</h4>
            </div>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
        </li>
            `;
    });
    listMusic.innerHTML = htmls.join("");
  },
  formatTime: function (time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  },
  loadCurrentSong: function () {
    nameTitle.textContent = `Song: ${this.listSong[this.indexSong].title}`;
    nameAuthor.textContent = `Author: ${this.listSong[this.indexSong].author}`;
    song.setAttribute(
      "src",
      `./assets/music/${this.listSong[this.indexSong].path}`
    );
    imgSong.setAttribute(
      "src",
      `./assets/img/${this.listSong[this.indexSong].image}`
    );
    song.volume = rangeVolume.value / 100;
    durationTime.textContent = this.formatTime(song.duration);
  },
  scrollToView: function () {
    setTimeout(() => {
      const activeSong = $(".active");
      activeSong.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  },
  handleEvent: function () {
    const _this = this;
    const cdThumbAnimation = imgThumb.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    category.onclick = () => {
      if (!_this.isDisplay) {
        listMusic.style.opacity = "1";
        listMusic.style.visibility = "visible";
        listMusic.style.height = "100%";
        listMusic.classList.remove("clickR");
        listMusic.classList.add("clickA");
        listMusic.style.width = "200px";
      } else {
        listMusic.classList.remove("clickA");
        listMusic.classList.add("clickR");
        listMusic.style.opacity = "0";
        listMusic.style.visibility = "hidden";
        listMusic.style.width = "0px";
      }
      _this.isDisplay = !_this.isDisplay;
    };
    cdThumbAnimation.pause();
    turnOffVolume.addEventListener("click", () => {
      if (_this.isTurnOffVolume) {
        turnOffVolume.innerHTML = `<ion-icon name="volume-high-outline"></ion-icon>`;
        rangeVolume.value = _this.currentVolume * 100;
        song.volume = _this.currentVolume;
      } else {
        turnOffVolume.innerHTML = `<ion-icon name="volume-mute-outline"></ion-icon>`;
        rangeVolume.value = 0;
        song.volume = 0;
      }
      _this.isTurnOffVolume = !_this.isTurnOffVolume;
    });
    btnPlay.addEventListener("click", () => {
      if (_this.isPlaying) {
        song.play();
        btnPlay.innerHTML = `<ion-icon name="pause""></ion-icon>`;
        cdThumbAnimation.play();
        wave.classList.add("loader");
        imgSong.classList.add("isGrowth");
      } else {
        song.pause();
        btnPlay.innerHTML = `<ion-icon name="play""></ion-icon>`;
        cdThumbAnimation.pause();
        wave.classList.remove("loader");
        imgSong.classList.remove("isGrowth");
      }
      _this.isPlaying = !_this.isPlaying;
    });
    nextSongBtn.addEventListener("click", () => {
      _this.indexSong++;
      if (_this.indexSong >= _this.listSong.length) {
        _this.indexSong = 0;
      }
      _this.isPlaying = true;
      _this.loadCurrentSong();
      btnPlay.click();
      _this.render();
      _this.scrollToView();
    });
    song.addEventListener("ended", () => {
      _this.indexSong++;
      if (_this.indexSong >= _this.listSong.length) {
        _this.indexSong = 0;
      }
      _this.isPlaying = true;
      _this.loadCurrentSong();
      btnPlay.click();
      _this.render();
      _this.scrollToView();
    });
    prevSongBtn.addEventListener("click", () => {
      _this.indexSong--;
      if (_this.indexSong < 0) {
        _this.indexSong = _this.listSong.length - 1;
      }
      _this.isPlaying = true;
      _this.loadCurrentSong();
      btnPlay.click();
      _this.render();
      _this.scrollToView();
    });
    listMusic.addEventListener("click", (e) => {
      const nodeList = e.target.closest(".music-item:not(.active)");
      if (nodeList) {
        _this.indexSong = Number(
          e.target.closest(".music-item:not(.active)").dataset.index
        );
        _this.isPlaying = true;
        _this.loadCurrentSong();
        _this.render();
        btnPlay.click();
      }
    });

    song.ontimeupdate = () => {
      rangeBar.value = song.currentTime;
      rangeBar.max = song.duration;
      remainingTime.textContent = _this.formatTime(song.currentTime);
      if (isNaN(song.duration)) {
        durationTime.textContent = "00:00";
      } else {
        durationTime.textContent = _this.formatTime(song.duration);
      }
    };
    rangeBar.oninput = (e) => {
      song.currentTime = e.target.value;
    };
    rangeVolume.oninput = (e) => {
      _this.currentVolume = song.volume = e.target.value / 100;
    };
  },
  start: function () {
    this.render();
    this.loadCurrentSong();
    this.handleEvent();
  },
};

app.start();
