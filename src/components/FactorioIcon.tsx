'use client';

import Image from 'next/image';

type FactorioIconProps = {
    iconName: string;
    iconType?: string;
    alt: string;
    width?: number;
    height?: number;
};

export default function FactorioIcon ({
    iconName,
    iconType,
    alt,
    width = 32,
    height = 32
}: FactorioIconProps) {
    if (iconType === 'virtual') {
        iconType = 'virtual-signal';
    }
    if (iconType === undefined) {
        iconType = 'item';
    }
    const iconSrc = `/icons/${iconType}/${iconName}.png`;
    return <Image src={iconSrc} alt={alt} width={width} height={32} />;
}
