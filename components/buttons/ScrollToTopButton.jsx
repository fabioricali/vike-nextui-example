import {useState, useEffect} from "react";
import {ArrowSmallUpIcon} from "@heroicons/react/20/solid/index.js";
import {Button} from "@nextui-org/react";

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            setIsVisible(scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <div className={'bottom-36 right-6 fixed z-10 opacity-50 hover:opacity-100'}>
                    <Button
                        onPress={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}
                        isIconOnly
                        radius={'full'}
                    >
                        <ArrowSmallUpIcon className="h-8 w-8" aria-hidden="true"/>
                    </Button>
                </div>
            )}
        </>
    );
};

export default ScrollToTopButton;