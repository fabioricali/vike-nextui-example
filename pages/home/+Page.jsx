import Card2 from "../../components/card/Card2.jsx";
import {Divider, Link} from "@nextui-org/react";
import Title1 from "../../components/title/Title1.jsx";
import {Link as Link2} from "../../renderer/Link.jsx";

function Page() {
    return (
        <div className="mx-auto w-full max-w-7xl grow lg:flex">
            <div className={'bg-gray-200 w-96 space-y-3 hidden lg:px-6 lg:block'}>
                <div>
                    <Link href={'/charts'}>Click with NextUI Link</Link>
                </div>
                <div>
                    <Link2 href={'/charts'}>Click normal a</Link2>
                </div>
            </div>
            <div className={'bg-amber-900 space-y-3 px-6 lg:flex-1 lg:min-w-[680px]'}>

            </div>
            <div className={'bg-gray-800 w-96'}>3</div>
        </div>
    )
}

export default Page