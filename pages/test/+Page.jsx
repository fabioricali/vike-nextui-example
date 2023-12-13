import {BellIcon} from '@heroicons/react/24/outline'
import MyModal from "./MyModal.jsx";
import {Button, useDisclosure} from "@nextui-org/react";
import React from "react";
import AModal from "../../components/modals/Modal.jsx";

const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]

function Page() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    function onOkClick(close) {
        close();
    }

    return (
        <div className="flex min-h-full flex-col dark">
            <div className="mx-auto w-full max-w-7xl grow lg:flex _bg-amber-700">
                <div className="flex-1 lg:pr-6">
                    <div className="relative flex items-center space-x-3 bg-blue-800 h-96 mb-6">
                        <Button onPress={onOpen}>Open Modal</Button>
                        <AModal onOkClick={onOkClick} title={'Share'} isOpen={isOpen} onOpenChange={onOpenChange}>
                            <div>
                                Some info
                            </div>
                        </AModal>
                    </div>
                    {people.map((person, i) => (
                        <div
                            key={i}
                            className="relative flex items-center space-x-3 mb-2 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                        >
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt=""/>
                            </div>
                            <div className="min-w-0 flex-1">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true"/>
                                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                    <p className="truncate text-sm text-gray-500">{person.role}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0 lg:pl-6">
                    <div className="relative flex items-center space-x-3 bg-blue-800 h-96 mb-6">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page