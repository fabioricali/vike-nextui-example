import {Card, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import * as PropTypes from "prop-types";
import {Link} from "../../renderer/Link.jsx";
import {navigate} from "vike/client/router";

export default function Card2({text1, text2, text3, image, link, className}) {
    return (
        <Card shadow="sm" className={className} isPressable onPress={() => link && navigate(link)}>
            <CardBody className={"overflow-visible p-0"}>
                {image && (
                    <Image
                        shadow="sm"
                        radius="none"
                        width="100%"
                        alt={text1 || ''}
                        className={'w-full object-cover'}
                        src={image}
                    />
                )}
            </CardBody>
            <CardFooter className={'text-xs text-left block'}>
                {text1 && (
                    <h2 className={'font-bold text-ellipsis'}>{text1}</h2>
                )}
                {text2 && (
                    <p className={'text-ellipsis'}>{text2}</p>
                )}
                {text3 && (
                    <>
                        <Divider/>
                        <div className={'text-ellipsis'}>{text3}</div>
                    </>
                )}
            </CardFooter>
        </Card>
    )
}

Card2.propTypes = {
    text1: PropTypes.any,
    text2: PropTypes.any,
    text3: PropTypes.any,
    image: PropTypes.any,
    link: PropTypes.any,
    className: PropTypes.any,
}