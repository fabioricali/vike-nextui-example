
export default class VideoSwitcher {
    constructor(videoSource, viewTarget, options = {}) {
        this.videoSource = videoSource;
        this.viewTarget = viewTarget;
        this.drawingStatus = 1;
        this._currentSrc = this.videoSource.currentSrc;
        this.canvasVisible = false;

        this.options = Object.assign({}, {
            aspectRatio: '16/9',
            firstFrameDelay: 100,
            poster: null,
            onBeforeCapture: null,
            isPrimary: false
        }, options)

        this.createCanvas();
        this.createCanvasObserver();
        this.createVideoHandles();
        this.createPoster();

        if (window) {
            window._videoViewCollisions = window._videoViewCollisions || {};
            this.globalVideoViewCollisions = window._videoViewCollisions;
        } else {
            console.log('no window found')
        }

        // auto-run
        // this.runTask();
    }

    createCanvasObserver() {
        this.canvas.style.display = 'none';
        this.handleCanvasIntersection = setInterval(() => {
            this.canvasVisible = this.constructor.isElementVisible(this.canvas);
            if (this.options.isPrimary) {
                this.globalVideoViewCollisions[this._currentSrc] = this.canvasVisible;
                this.canvas.style.display = 'block';
            } else {
                // console.log('ìa')
                if (this.canvasVisible && this.globalVideoViewCollisions[this._currentSrc]) {
                    this.canvas.style.display = 'none'
                } else {
                    this.canvas.style.display = 'block'
                }
            }
        }, 20)
    }

    destroyCanvasObserver() {
        clearInterval(this.handleCanvasIntersection)
        if (this.globalVideoViewCollisions[this._currentSrc]) {
            delete this.globalVideoViewCollisions[this._currentSrc];
        }
        console.log('destroy observer')
    }

    static isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        // Controlla se l'elemento è completamente al di fuori della finestra del browser
        return !(rect.bottom < 0 ||
            rect.top > windowHeight ||
            rect.right < 0 ||
            rect.left > windowWidth);
    }

    pause() {
        this.drawingStatus = 0;
    }

    resume() {
        this.drawingStatus = 1;
    }

    createPoster() {
        if (this.options.poster) {
            let imageToLoad;
            if (Array.isArray(this.options.poster)) {
                //imageToLoad = this.options.poster[(Math.floor(Math.random() * this.options.poster.length))];
                imageToLoad = this.options.poster[this.options.poster.length - 1];
            } else {
                imageToLoad = this.options.poster;
            }
            const image = new Image()
            image.onload = () => {
                this.drawFrame(image)
            }
            image.src = imageToLoad;
        }
    }

    createVideoHandles() {
        this._handlePlaying = () => {
            this.runCapture();
        }

        this._handleLoadeddata = () => {
            setTimeout(() => {
                if (this._onBeforeCapture() === false) {
                    return false;
                }
                this.drawFrame();
            }, this.options.firstFrameDelay)
        }

        this.videoSource.addEventListener('playing', this._handlePlaying, false);
        this.videoSource.addEventListener('loadeddata', this._handleLoadeddata, false);
    }

    _onBeforeCapture() {
        if (typeof this.options.onBeforeCapture === 'function') {
            if (this.options.onBeforeCapture(this) === false) {
                return false;
            }
        }
    }

    destroyVideoHandles() {
        this.videoSource.removeEventListener('playing', this._handlePlaying)
        this.videoSource.removeEventListener('loadeddata', this._handleLoadeddata)
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `width: 100%; aspect-ratio: ${this.options.aspectRatio}`;
        this.viewTarget.appendChild(this.canvas);
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    destroyCanvas() {
        this.canvas.remove();
        this.destroyCanvasObserver();
    }
    drawFrame(source) {
        const _source = source || this.videoSource;
        this._currentSrc = _source.currentSrc;
        this.canvasContext.drawImage(_source, 0, 0, this.canvas.width, this.canvas.height)
        // if (this.options.isPrimary) {
        //     this.globalVideoViewCollisions[this._currentSrc] = null;
        // }
    }

    runCapture() {
        if (this._onBeforeCapture() === false) {
            return false;
        }
        if ((this.videoSource.paused || this.videoSource.ended) && this.drawingStatus === 1) return false;
        this.drawFrame();
        requestAnimationFrame(() => {
            this.runCapture()
        })
    }

    destroy() {
        this.destroyVideoHandles();
        this.destroyCanvas();
        if (this.globalVideoViewCollisions[this.videoSource.currentSrc]) {
            delete this.globalVideoViewCollisions[this.videoSource.currentSrc];
        }
    }
}