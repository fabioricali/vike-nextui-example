import SearchModal from "./SearchModal.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import {Button, useDisclosure} from "@nextui-org/react";

export default function SearchButton() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <Button
                onPress={onOpen}
                size={'sm'}
                isIconOnly
                variant="light"
            >
                <MagnifyingGlassIcon className=" text-gray-400" aria-hidden="true" />
            </Button>
            <SearchModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        </>
    )
}