import {RssIcon} from "@heroicons/react/24/outline/index.js";
import {Button} from "@nextui-org/react";

export default function RSSButton(props) {
    return (
        <>
            <Button
                variant="bordered"
                startContent={<RssIcon className="w-5" aria-hidden="true"/>}
                className={'border-white/30 hidden sm:inline-flex'}
            >
                Feed
            </Button>
            <Button
                variant="light"
                size={'sm'}
                isIconOnly
                className={'sm:hidden'}
            >
                <RssIcon aria-hidden="true"/>
            </Button>
        </>
    )
}