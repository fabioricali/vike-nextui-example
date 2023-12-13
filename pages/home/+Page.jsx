import {Link} from "@nextui-org/react";

function Page() {
    return (
        <div className="mx-auto w-full max-w-7xl grow">
            <div>
                <Link href={'/other'}>Click with NextUI Link</Link>
            </div>
            <div>
                <a href={'/other'}>Click normal a</a>
            </div>
        </div>
    )
}

export default Page