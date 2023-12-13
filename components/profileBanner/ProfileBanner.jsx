import ShareButton from "../sharing/ShareButton.jsx";
import {Image} from "@nextui-org/react";

export default function ProfileBanner(page) {
    return (
        <div className="w-full _pb-6 md:pb-0 md:mb-6">
            <img className="h-24 w-full object-cover sm:rounded sm:h-32 md:h-64" src={page.topImage} alt="" />
            <div className="mx-auto max-w-6xl px-6 sm:px-6 lg:px-0">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex">
                        <Image className="h-24 w-24 rounded-full border-4 border-white/30 sm:h-32 sm:w-32" src={page.logo} alt="Logo" />
                    </div>
                    <div className="flex sm:mt-16 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                            <h1 className="text-1xl font-bold text-gray-100 mb-1 sm:text-2xl sm:truncate" title={page.title}>{page.title}</h1>
                            <div className={'text-white/60 text-sm sm:truncate'} title={page.shortDescription}>{page.shortDescription}</div>
                        </div>
                        <div className="mt-6 _space-y-3 _space-x-3 sm:flex-row sm:space-y-0 _flex _justify-end">
                            <ShareButton/>
                            {/*<SearchButton/>*/}
                        </div>
                    </div>
                </div>
                <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">{page.title}</h1>
                </div>
            </div>
        </div>
    )
}
