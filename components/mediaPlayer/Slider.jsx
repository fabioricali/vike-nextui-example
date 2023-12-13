import {useRef} from 'react'
import {
    mergeProps,
    useFocusRing,
    useSlider,
    useSliderThumb,
    VisuallyHidden,
} from 'react-aria'
import {useSliderState} from 'react-stately'
import clsx from 'clsx'
import PropTypes from "prop-types";

function parseTime(seconds) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds - hours * 3600) / 60)
    seconds = seconds - hours * 3600 - minutes * 60
    return [hours, minutes, seconds]
}

function formatTime(seconds, totalSeconds = seconds) {
    let totalWithoutLeadingZeroes = totalSeconds.slice(
        totalSeconds.findIndex((x) => x !== 0),
    )
    return seconds
        .slice(seconds.length - totalWithoutLeadingZeroes.length)
        .map((x) => x.toString().padStart(2, '0'))
        .join(':')
}

function Thumb(props) {
    let {state, trackRef, focusProps, isFocusVisible, index} = props
    let inputRef = useRef(null)
    let {thumbProps, inputProps} = useSliderThumb(
        {index, trackRef, inputRef},
        state,
    )

    return (
        <div
            className="absolute top-1/2 -translate-x-1/2"
            style={{
                left: `${state.getThumbPercent(index) * 100}%`,
            }}
        >
            <div
                {...thumbProps}
                onMouseDown={(...args) => {
                    thumbProps.onMouseDown?.(...args)
                    props.onChangeStart?.()
                }}
                onPointerDown={(...args) => {
                    thumbProps.onPointerDown?.(...args)
                    props.onChangeStart?.()
                }}
                className={clsx(
                    'h-4 rounded-full transition hover:scale-110 active:scale-90 ',
                    isFocusVisible || state.isThumbDragging(index)
                        ? 'w-5 h-5 bg-slate-500 md:w-1.5 md:bg-white'
                        : 'border border-slate-400 w-4 bg-slate-800 md:w-1 md:bg-white/80 md:border-none',
                )}
            >
                <VisuallyHidden>
                    <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
                </VisuallyHidden>
            </div>
        </div>
    )
}

Thumb.propTypes = {
    state: PropTypes.object,
    trackRef: PropTypes.any,
    focusProps: PropTypes.any,
    isFocusVisible: PropTypes.bool,
    index: PropTypes.number,
    onChangeStart: PropTypes.func,
}

export function Slider(props) {
    let trackRef = useRef(null)
    let state = useSliderState(props)
    let {groupProps, trackProps, labelProps, outputProps} = useSlider(
        props,
        state,
        trackRef,
    )
    let {focusProps, isFocusVisible} = useFocusRing()

    let currentTime = parseTime(state.getThumbValue(0))
    let totalTime = parseTime(state.getThumbMaxValue(0))

    return (
        <div
            {...groupProps}
            className="border-t-1 border-slate-400 md:border-none absolute inset-x-0 bottom-full flex flex-auto touch-none items-center gap-6 md:relative"
        >
            {props.label && (
                <label className="sr-only" {...labelProps}>
                    {props.label}
                </label>
            )}
            <div
                {...trackProps}
                onMouseDown={(...args) => {
                    trackProps.onMouseDown?.(...args)
                    props.onChangeStart?.()
                }}
                onPointerDown={(...args) => {
                    trackProps.onPointerDown?.(...args)
                    props.onChangeStart?.()
                }}
                ref={trackRef}
                className="relative w-full bg-white/20 md:rounded-full"
            >
                <div
                    className={clsx(
                        'h-2 md:rounded-l-xl md:rounded-r-md',
                        isFocusVisible || state.isThumbDragging(0)
                            ? 'bg-white'
                            : 'bg-white/80',
                    )}
                    style={{
                        width:
                            state.getThumbValue(0) === 0
                                ? 0
                                : `calc(${state.getThumbPercent(0) * 100}% - ${
                                    isFocusVisible || state.isThumbDragging(0)
                                        ? '0.3125rem'
                                        : '0.25rem'
                                })`,
                    }}
                />
                <Thumb
                    index={0}
                    state={state}
                    trackRef={trackRef}
                    onChangeStart={props.onChangeStart}
                    focusProps={focusProps}
                    isFocusVisible={isFocusVisible}
                />
            </div>
            <div className="hidden items-center gap-2 md:flex">
                <output
                    {...outputProps}
                    aria-live="off"
                    className={clsx(
                        'hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 md:block',
                        state.getThumbMaxValue(0) === 0 && 'opacity-0',
                        isFocusVisible || state.isThumbDragging(0)
                            ? 'text-white font-bold'
                            : 'text-white',
                    )}
                >
                    {formatTime(currentTime, totalTime)}
                </output>
                <span className="text-sm leading-6 text-slate-300" aria-hidden="true">
          /
        </span>
                <span
                    className={clsx(
                        'hidden rounded-md px-1 py-0.5 font-mono text-sm leading-6 text-white md:block',
                        state.getThumbMaxValue(0) === 0 && 'opacity-0',
                    )}
                >
          {formatTime(totalTime)}
        </span>
            </div>
        </div>
    )
}

Slider.propTypes = {
    state: PropTypes.object,
    trackRef: PropTypes.any,
    focusProps: PropTypes.any,
    label: PropTypes.any,
    isFocusVisible: PropTypes.bool,
    index: PropTypes.number,
    onChangeStart: PropTypes.func
}