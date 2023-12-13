import {Divider} from "@nextui-org/react";
import * as PropTypes from "prop-types";

export default function Title1({text1, text2}) {
    return (
        <>
            <div>
                <div className={"text-xs"}>{text1}</div>
                <div className={"text-sm font-bold leading-6"}>{text2}</div>
            </div>
            <Divider/>
        </>
    );
}

Title1.propTypes = {
    text1: PropTypes.any,
    text2: PropTypes.any,
}