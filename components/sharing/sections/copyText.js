import confetti from "canvas-confetti";

export default function copyText (inputRef) {
    confetti();
    inputRef.current.select();
    navigator.clipboard.writeText(inputRef.current.value).then();
}