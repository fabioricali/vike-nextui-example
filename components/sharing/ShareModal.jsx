import {useTranslation} from "react-i18next";
import {
    Modal, ModalBody, ModalContent, ModalHeader, Tabs, Tab
} from "@nextui-org/react";
import {usePageContext} from "../../renderer/usePageContext.jsx";
import './style.css';
import PropTypes from "prop-types";
import Socials from "./sections/Socials.jsx";
import Feed from "./sections/Feed.jsx";
import Embed from "./sections/Embed.jsx";

function ShareModal({isOpen, onOpenChange, shareUrl, content, enableFeed, enableEmbed}) {
    const {pageProps} = usePageContext();
    const {t} = useTranslation();

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} defaultOpen={false} backdrop={'blur'} size={'3xl'}
               placement={'top'}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('Sharing Options')}</ModalHeader>
                        <ModalBody>
                            <div className={'pb-4'}>
                                <Tabs aria-label="Options" fullWidth={true} size={'md'}>
                                    <Tab key={'socials'} title={t('Share on social network')}>
                                        <Socials shareUrl={shareUrl} content={content}/>
                                    </Tab>
                                    {enableFeed && (
                                        <Tab key={'feed'} title={t('Get RSS feed')}>
                                            <Feed/>
                                        </Tab>)
                                    }
                                    {enableEmbed && (
                                        <Tab key={'embed'} title={t('Embed widget')}>
                                            <Embed/>
                                        </Tab>)
                                    }
                                </Tabs>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

//isOpen, onOpenChange, shareUrl, content
ShareModal.propTypes = {
    isOpen: PropTypes.bool,
    enableFeed: PropTypes.bool,
    enableEmbed: PropTypes.bool,
    onOpenChange: PropTypes.func,
    shareUrl: PropTypes.any,
    content: PropTypes.any
}
export default ShareModal;

