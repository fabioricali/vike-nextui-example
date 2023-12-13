import {Button, Input} from "@nextui-org/react";
import {RssIcon} from "@heroicons/react/24/outline/index.js";
import {useTranslation} from "react-i18next";
import copyText from "./copyText.js";
import {usePageContext} from "../../../renderer/usePageContext.jsx";
import {useRef} from "react";
import openLink from "./openLink.js";

export default function Feed () {
    const {t} = useTranslation();
    const inputOfFeedLinkRef = useRef(null);
    const {pageProps} = usePageContext();
    const feedUrl = pageProps.feedUrl;

    return (
        <div className={"mt-4"}>
            <p className="mb-2 text-left">{t('Copy the feed url')}</p>
            <div className={"flex space-x-3"}>
                <Input
                    type={'url'}
                    readOnly
                    defaultValue={feedUrl}
                    ref={inputOfFeedLinkRef}
                    labelPlacement={'outside'}
                    startContent={<RssIcon className={'w-5 text-yellow-500'}/>}
                />
                <Button
                    onPress={() => copyText(inputOfFeedLinkRef)}
                >{t('Copy')}</Button>
                <Button
                    onPress={() => openLink(inputOfFeedLinkRef)}
                >{t('Open')}</Button>
            </div>
        </div>
    )
}