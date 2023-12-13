import {SocialIcon} from 'react-social-icons'
import {useTranslation} from "react-i18next";
import {useRef} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input} from "@nextui-org/react";
import {usePageContext} from "../../renderer/usePageContext.jsx";
import {BASE_URL} from "../../consts.json";
import confetti from "canvas-confetti";

function SearchModal({isOpen, onOpenChange, shareUrl, content}) {
    const pageContext = usePageContext();
    const {t} = useTranslation();
    const inputRef = useRef(null);
    const linkToShareOriginal = shareUrl || (BASE_URL + pageContext.urlOriginal);
    const linkToShare = encodeURIComponent(linkToShareOriginal);
    const descriptionToShare = encodeURIComponent(content || '');

    const handleCopyClick = () => {
        confetti();
        inputRef.current.select();
        navigator.clipboard.writeText(inputRef.current.value).then();
        // inputRef.current.setSelectionRange(0, 0);  // Deseleziona il testo
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} defaultOpen={false} backdrop={'blur'}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('Search')}</ModalHeader>
                        <ModalBody>
                            <div className={'pb-4'}>
                                <div className="flex space-x-4 mb-6">

                                </div>
                            </div>
                        </ModalBody>
                        {/*<ModalFooter>*/}
                            {/*<Button color="danger" variant="light" onPress={onClose}>*/}
                            {/*    Close*/}
                            {/*</Button>*/}
                            {/*<Button color="primary" onPress={onClose}>*/}
                            {/*    Action*/}
                            {/*</Button>*/}
                        {/*</ModalFooter>*/}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default SearchModal;
