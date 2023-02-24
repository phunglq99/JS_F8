/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play songg when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'F8_PLAYER'

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: "Anh là ai",
            singer: "Phương Ly",
            path: "./assets/music/chill-hits/anh-la-ai.mp3",
            image: './assets/image/anh-la-ai.jpg'
        },
        {
            name: "Trời giấu trời mang đi",
            singer: "Amee x Virus",
            path: "./assets/music/chill-hits/troi-giau-troi-mang-di.mp3",
            image: './assets/image/troi-giau-troi-mang-di.webp'
        },
        {
            name: "Có em chờ",
            singer: "Min",
            path: "./assets/music/chill-hits/co-em-cho.mp3",
            image: './assets/image/Bìa_album_Có_em_chờ.jpg'
        },
        {
            name: "Nếu ngày ấy",
            singer: "Soobin Hoàng Sơn",
            path: "./assets/music/chill-hits/neu-ngay-ay.mp3",
            image: './assets/image/neu-ngay-ay.jfif'
        },
        {
            name: "Chuyện đôi ta",
            singer: "Da LAB",
            path: "./assets/music/chill-hits/chuyen-doi-ta.mp3",
            image: './assets/image/chuyen-doi-ta.jfif'
        },
        {
            name: "There's no one at all",
            singer: "Sơn Tùng MTP",
            path: "./assets/music/chill-hits/there's-no-one-at-all.mp3",
            image: './assets/image/there-no-one-at-all.jpg'
        },
        {
            name: "Chuyện đôi ta",
            singer: "Da LAB",
            path: "./assets/music/chill-hits/chuyen-doi-ta.mp3",
            image: './assets/image/chuyen-doi-ta.jfif'
        },
        {
            name: "Chuyện đôi ta",
            singer: "Da LAB",
            path: "./assets/music/chill-hits/chuyen-doi-ta.mp3",
            image: './assets/image/chuyen-doi-ta.jfif'
        },
        {
            name: "Chuyện đôi ta",
            singer: "Da LAB",
            path: "./assets/music/chill-hits/chuyen-doi-ta.mp3",
            image: './assets/image/chuyen-doi-ta.jfif'
        },
    ],

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: function () {
        const htmls = this.songs.map((song,index) => {
            return `
                <div class="song ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })

        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth

        // xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //  Xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi song được play 
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play()
        }

        // Khi song bị pause 
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua song
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }

        // Khi next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong();
            }

            audio.play();
            _this.activeSong();
            _this.scrollToaActiveSong();
        }

        // Khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong();
            };

            audio.play();
            _this.activeSong();
            _this.scrollToaActiveSong();
        }

        // Xử lý bật tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // Xử lý lặp lại song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Xử lý next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if( songNode|| e.target.closest('.option')) {
                // xử lý khi click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.activeSong();
                    audio.play()
                }
                // Xử lý khi click vào song option
                if(e.target.closest('option')) {

                }
            }
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    activeSong : function() {
        const songEL = $$('.song');
        songEL.forEach((song,index) => {
            if(index === this.currentIndex) {
                song.classList.add('active');
            } else {
                song.classList.remove('active');
            }
        });
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function() {
        this.currentIndex ++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }

        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex --;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }


        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex) 
        this.currentIndex = newIndex;
        this.loadCurrentSong()
    },

    scrollToaActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: "end",
                inline: "nearest"
            })
        },300)
    },

    start: function() {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe/ xử lý các sự kiện
        this.handleEvents();

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & button
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
}

app.start()