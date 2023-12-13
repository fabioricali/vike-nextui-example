import {redirect} from "vike/abort";

export async function onBeforeRender(pageContext) {
    //throw redirect('/radiotaormina')

    return {
        pageContext: {

        }
    };
}