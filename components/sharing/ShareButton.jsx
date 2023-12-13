import ShareModal from "./ShareModal.jsx";
import {ShareIcon} from "@heroicons/react/24/outline/index.js";
import {Button, useDisclosure} from "@nextui-org/react";
import {useTranslation} from "react-i18next";

export default function ShareButton(props) {
    const {t} = useTranslation();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button
                onPress={onOpen}
                variant="bordered"
                startContent={<ShareIcon className="w-5" aria-hidden="true" />}
                className={'border-white/30 hidden sm:inline-flex'}
            >
                {t('Share')}
            </Button>
            <Button
                onPress={onOpen}
                variant="light"
                size={'sm'}
                isIconOnly
                className={'sm:hidden'}
            >
                <ShareIcon aria-hidden="true" />
            </Button>
            <ShareModal isOpen={isOpen} onOpenChange={onOpenChange} {...props}/>
        </>
    )
}