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

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')


const app = {
    currentIndex: 0,
    isPlaying : false,

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
            name: "Chuyện đôi ta",
            singer: "Da LAB",
            path: "./assets/music/chill-hits/chuyen-doi-ta.mp3",
            image: './assets/image/chuyen-doi-ta.jfif'
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
        {
            name: "Chuyện đôi ta",
            singer: "Da LAB",
            path: "./assets/music/chill-hits/chuyen-doi-ta.mp3",
            image: './assets/image/chuyen-doi-ta.jfif'
        },
    ],

    render: function () {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
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

        $('.playlist').innerHTML = htmls.join('');
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

    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    start: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe/ xử lý các sự kiện
        this.handleEvents();

        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //Render playlist
        this.render();
    }
}

app.start()