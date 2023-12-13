import {useEffect, useRef} from 'react'
import XWAVE from "../../helpers/wavecanvas/xwave.js";
import * as PropTypes from "prop-types";
import {useMediaPlayer} from "../mediaPlayer/MediaProvider.jsx";

function createWaveForm(config = {}) {

    if (!config.container) return ;

    let waveFormInstance = new XWAVE(config.container, config.duration, config.peaks, null, {
        width: config.container.offsetWidth,
        height: 96,
        cursorType: 'linefill', // line, linefill, none
        cursorLineColor: 'rgba(255,255,255,.4)',
        cursorFillColor: 'black',
        cursorFillOpacity: 0.05,
        cursorTimeColor: 'black',
        cursorTimeFontSize: '9pt',
        cursorTimeFontShadow: '0 0 3px #ccc',
        cursorTimeNegativeColor: 'black',
        cursorLineWidth: 2,
        hideMarker: ['prefade', 'outro', 'ri', 'ro'],
        intraMarker: true,
        waveColor: 'orange',
        lineBaseColor: '#blue',
        backgroundColor: 'transparent',
        timelineBackgroundColor: '#fff',
        timelineTickerColor: '#555',
        timelineTimeColor: '#ccc',
        timelineBorderColor: '#fff', //'transparent',
        timeline: false,
        showCursorTime: false,
        showTimeOnMouse: true,
        zoomWheel: false,
        blockRender: true,
        hideTimeMilliseconds: true,
        fontFamily: 'monospace',
        showQuickTime: true
    });
    waveFormInstance.on('waveformClick', (ms) => {
        config.player.seek(ms / 1000);
    });

    return waveFormInstance;
}

function destroyWaveForm(waveFormInstance) {
    if (!waveFormInstance) return;
    waveFormInstance.domNode.style.cssText = '';
    waveFormInstance.domNode.innerHTML = '';
}

export function WaveForm({episode}) {
    let player = useMediaPlayer(episode)
    const waveCanvasContainerRef = useRef(null);
    const waveCanvasRef = useRef(null);

    function doWaveForm() {
        waveCanvasRef.current = createWaveForm({
            container: waveCanvasContainerRef.current,
            player,
            peaks: episode.wavePoints,
            duration: episode.duration
        });
        waveCanvasRef.current.setCursorTime(player.currentTime * 1000)
    }

    useEffect(() => {
        if (!waveCanvasRef.current) {
            doWaveForm();
            window.addEventListener("resize", () => {
                destroyWaveForm(waveCanvasRef.current);
                doWaveForm();
            });

        }
    }, [waveCanvasContainerRef]);
    //
    useEffect(() => {
        if (waveCanvasRef.current.setCursorTime && player.playing)
            waveCanvasRef.current.setCursorTime(player.currentTime * 1000)
    }, [player]);

    if (!episode)
        return;

    return (
        <div className={'h-24'} ref={waveCanvasContainerRef}></div>
    )

}

WaveForm.propTypes = {
    episode: PropTypes.object
}