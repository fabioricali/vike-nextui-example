import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {navigate} from "vike/client/router";

export default function Card1({textBig, text, subText, image, link}) {
    return (
        <Card className="py-4 border-1 border-white/30 bg-black/30"
              isPressable={!!link}
              onClick={() => navigate(link)}
        >
            <CardHeader className="pb-0 pt-0 px-4 block text-left">
                {text && (<p className="text-tiny uppercase font-bold truncate" title={text}>{text}</p>)}
                {subText && (<small className="block text-default-500 truncate" title={subText}>{subText}</small>)}
                {textBig && (<h4 className="font-bold text-small sm:text-large truncate" title={textBig}>{textBig}</h4>)}
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                {image && (<Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={image}
                    sizes={'100%'}
                />)}
            </CardBody>
        </Card>
    );
}