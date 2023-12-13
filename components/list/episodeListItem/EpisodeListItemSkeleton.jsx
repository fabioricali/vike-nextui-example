export default function EpisodeListItemSkeleton() {
    return (
        <div
            className="flex items-center space-x-6
            px-6 py-5 shadow-sm animate-pulse
            border-b-1
            border-white/30
            md:mb-2
            md:rounded-large
            md:border
             "
        >
            <div className="flex-shrink-0">
                <div className="rounded bg-white/50 h-10 w-10"></div>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
                <div className="h-2 w-64 bg-white/50 rounded"></div>
                <div className="h-2 w-24 bg-white/50 rounded"></div>
                <div className="h-2 w-16 bg-white/50 rounded"></div>
            </div>
            <div className="--flex-shrink-0 font-bold text-sm">
                <div className="h-2 w-6 bg-white/50 rounded"></div>
            </div>
        </div>
    )
}