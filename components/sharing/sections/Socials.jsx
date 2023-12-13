import {SocialIcon} from "react-social-icons";
import {Button, Input} from "@nextui-org/react";
import {LinkIcon} from "@heroicons/react/24/outline/index.js";
import {useTranslation} from "react-i18next";
import createSocialsObject from "./createSocialsObject.js";
import {APP_HOST} from "../../../config.js";
import {usePageContext} from "../../../renderer/usePageContext.jsx";
import {useRef} from "react";
import copyText from "./copyText.js";
import PropTypes from "prop-types";

export default function Socials({shareUrl, content}) {
    const {urlOriginal} = usePageContext();
    const inputOfPageLinkRef = useRef(null);
    const {t} = useTranslation();
    const linkToShareOriginal = shareUrl || (APP_HOST + urlOriginal);
    const linkToShare = encodeURIComponent(linkToShareOriginal);
    const descriptionToShare = encodeURIComponent(content || '');
    const socials = createSocialsObject(linkToShare, descriptionToShare)

    return (
        <>
            <div className={"flex space-x-4 mb-6 mt-4"}>
                {socials.map(social => (
                    <a key={social.type} href={social.url} target={'_blank'}
                       rel={'noreferrer'}>
                        <SocialIcon as={'span'} network={social.type}
                                    className={'--shadow-md --shadow-cyan-500/30 rounded-full transition-all hover:shadow-cyan-500/50 hover:scale-110 hover:shadow-lg active:scale-80'}/>
                    </a>
                ))}
            </div>
            <div className={"mt-4"}>
                <p className="mb-2 text-left">{t('Copy and paste this link into an email or chat')}</p>
                <div className={"flex space-x-3"}>
                    <Input
                        type={'url'}
                        readOnly
                        defaultValue={linkToShareOriginal}
                        ref={inputOfPageLinkRef}
                        labelPlacement={'outside'}
                        startContent={<LinkIcon className={'w-5 text-yellow-500'}/>}
                    />
                    <Button
                        onPress={() => copyText(inputOfPageLinkRef)}
                    >{t('Copy')}</Button>
                </div>
            </div>
        </>
    )
}

Socials.propTypes = {
    shareUrl: PropTypes.any,
    content: PropTypes.any
}