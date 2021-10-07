import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import markdownStyles from './markdown-styles.module.css'
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Image from "next/image";

const getRenderOptions = (links) => {
  const blockAssets = new Map(
    links.assets.block.map((asset) => [asset.sys.id, asset])
  );

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const asset = blockAssets.get(node.data.target.sys.id);
        const { url, width, height, description } = asset;
        // use next/image
        return (
          <Image
            className="border"
            src={url}
            width={width}
            height={height}
            alt={description}
          />
        );
      },
    },
  };
};

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles['markdown']}>
        {documentToReactComponents(content.json, getRenderOptions(content.links))}
      </div>
    </div>
  )
}
