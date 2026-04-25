import Image from 'next/image';

import { CheckIcon } from '@/components/CheckIcon';
import type { FeatureBlock as FeatureBlockType, FeatureBullet } from '@/lib/types';

interface FeatureBlockProps {
  block: FeatureBlockType;
}

export function FeatureBlock({ block }: FeatureBlockProps) {
  const isImageLeft = block.layout === 'image-left';
  const textOrder = isImageLeft ? 'lg:order-2' : 'lg:order-1';
  const imageOrder = isImageLeft ? 'lg:order-1' : 'lg:order-2';

  return (
    <article className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[530px_1fr] lg:gap-16">
      <div className={`${textOrder} flex flex-col gap-5 sm:gap-[25px]`}>
        <header className="flex flex-col gap-3">
          <h3 className="heading-feature">{block.heading}</h3>
          <p className="lead text-gray-700">{block.description}</p>
        </header>

        {block.bullets && block.bullets.length > 0 && (
          <ul className="flex flex-col gap-3 sm:gap-[18px]">
            {block.bullets.map((bullet: FeatureBullet, i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15px] font-normal leading-[1.4] text-brand-900 sm:gap-4 sm:text-[16px]"
              >
                <CheckIcon size={20} className="mt-0.5 flex-shrink-0 text-brand-400" />
                {bullet.text}
              </li>
            ))}
          </ul>
        )}

        {block.closing_text && (
          <p className="lead text-gray-700">{block.closing_text}</p>
        )}
      </div>

      {block.image && (
        <div
          className={`${imageOrder} relative mx-auto aspect-[622/503] w-full max-w-[622px] lg:mx-0`}
        >
          <Image
            src={block.image}
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      )}
    </article>
  );
}
