"use client"
import { useCallback } from "react";
import Button from ".";
import { FaDownload } from "react-icons/fa6";

const CopyToClipboard = ({ blueprintString }: { blueprintString?: string }) => {
    "use client"
    const copy = useCallback(() => {
        if (blueprintString) {
            navigator.clipboard.writeText(blueprintString);
        }
    }, [blueprintString]);

    return (
        <Button green className='!justify-center gap-2' onClick={() => copy()}>
            <FaDownload />
            Copy to Clipboard
        </Button>
    );
};

export default CopyToClipboard;