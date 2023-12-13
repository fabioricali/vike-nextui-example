import {ArrowDownTrayIcon} from "@heroicons/react/24/outline/index.js";
import {Button} from "@nextui-org/react";

export default function DownloadButton(props) {
    return (
        <>
            <Button
                variant="bordered"
                startContent={<ArrowDownTrayIcon className="w-5" aria-hidden="true" />}
                className={'border-white/30 hidden sm:inline-flex'}
            >
                Download
            </Button>
            <Button
                variant="light"
                size={'sm'}
                isIconOnly
                className={'sm:hidden'}
            >
                <ArrowDownTrayIcon aria-hidden="true" />
            </Button>
        </>
    )
}