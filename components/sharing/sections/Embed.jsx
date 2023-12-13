import {useTranslation} from "react-i18next";
import {usePageContext} from "../../../renderer/usePageContext.jsx";
import {Button, Textarea} from "@nextui-org/react";
import {useRef} from "react";
import copyText from "./copyText.js";
function templateEmbed(embedUrl) {
    //language=html
    return `<div class="streamsolution-odplay" style="position: relative; height: 600px; width: 100%"><iframe style="position: absolute; top: 0; left:0; width: 100%; height: 100%; border:0;" src="${embedUrl}" title="StreamSolution ODPlay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
}

export default function Embed () {
    const {t} = useTranslation();
    const {pageProps} = usePageContext();
    const textareaRef = useRef(null);
    const {embedUrl, embedEpisodeAudio} = pageProps;

    return (
        <div className={'mt-4'}>
            <iframe src={embedUrl} className={`w-full mb-4 ${embedEpisodeAudio ? 'h-[200px]' : 'aspect-video'} bg-transparent`}></iframe>
            <div className={'flex space-x-3'}>
                <Textarea
                    ref={textareaRef}
                    label={t('Copy the embed code and paste it in your html')}
                    value={templateEmbed(embedUrl)}
                    maxRows={2}
                    classNames={{
                        input: "opacity-50"
                    }}
                    readOnly={true}
                />
                <Button
                    onPress={() => copyText(textareaRef)}
                >{t('Copy')}</Button>
            </div>
        </div>
    )
}