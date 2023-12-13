import ProfileLink from "../link/ProfileLink.jsx";
import {Image} from "@nextui-org/react";
import SeriesMetadata from "../list/seriesListItem/SeriesMetadata.jsx";

export default function ProfileSmall({page, series, routeParams, children}){

    return (
        <div className={"relative flex flex-col sm:p-0 md:mt-6"}>
            {series && (
                <>
                    <h1 className="text-gray-100 text-2xl sm:text-4xl font-bold mb-6">{series.title}</h1>
                    <div className={'mb-4'}>
                        <SeriesMetadata item={series}/>
                    </div>
                </>
            )}
            <div className="flex items-center">
                <div className={'flex-1 flex'}>
                    <ProfileLink config={{
                        pageSlug: routeParams.pageSlug
                    }}>
                        <span className={'flex items-center'}>
                            <Image src={page.logo} alt={page.title} className="h-8 w-8 mr-4 rounded-full border-2 border-white/30"/>
                            <span className="mr-8 text-sm sm:text-base font-bold">
                                {page.title}
                            </span>
                        </span>
                    </ProfileLink>

                </div>
                {children}
            </div>
            {series && (
                <div className="hidden mt-6">{series.shortDescription || series.description}</div>
            )}
        </div>
    )
}