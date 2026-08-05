function isWhitespace(node) {
  return node.type === 'text' && /^\s*$/.test(node.value || '');
}

function imageChildren(paragraph) {
  const children = paragraph.children || [];
  if (!children.every((child) => isWhitespace(child) || (child.type === 'element' && child.tagName === 'img'))) {
    return [];
  }
  return children.filter((child) => child.type === 'element' && child.tagName === 'img');
}

function figureForImage(img, index = 0) {
  const title = img.properties?.title;
  const alt = img.properties?.alt || '';
  img.properties ||= {};
  // Avoid native lazy-loading here: without intrinsic width/height the <img>
  // collapses to 0×0, so later images never intersect the viewport and stay unloaded.
  img.properties.loading = 'eager';
  img.properties.decoding ||= 'async';
  img.properties.className = ['h-full', 'w-full', 'cursor-zoom-in', 'object-cover'];

  const children = [
    {
      type: 'element',
      tagName: 'div',
      properties: {
        // Match post cover: `--radius-card` on all four corners via overflow clip.
        className: [
          'image-container',
          'aspect-video',
          'w-full',
          'overflow-hidden',
          'rounded-[var(--radius-card)]'
        ]
      },
      children: [img]
    }
  ];

  if (title) {
    children.push({
      type: 'element',
      tagName: 'figcaption',
      properties: { className: ['image-caption', 'mt-2.5', 'text-center', 'text-sm', 'text-muted-foreground'] },
      children: [{ type: 'text', value: String(title) }]
    });
  }

  // `not-prose` opts the figure out of the typography plugin so the utility
  // classes fully control its appearance. The semantic class names are kept as
  // hooks for the gallery/lightbox client script.
  return {
    type: 'element',
    tagName: 'figure',
    properties: {
      className: ['image-figure', 'not-prose', 'mt-8', 'mb-1'],
      dataImageSrc: img.properties.src,
      dataImageAlt: alt,
      dataGalleryIndex: String(index)
    },
    children
  };
}

function galleryForImages(images) {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: ['markdown-gallery', 'not-prose', 'my-8'],
      dataGallery: 'true',
      dataLayout: 'grid'
    },
    children: images.map((img, index) => figureForImage(img, index))
  };
}

function visit(parent) {
  if (!Array.isArray(parent.children)) return;

  const next = [];

  for (let index = 0; index < parent.children.length; index += 1) {
    const child = parent.children[index];

    if (child.type === 'element' && child.tagName === 'p') {
      const images = imageChildren(child);
      if (images.length > 0) {
        // Merge successive image-only paragraphs so blank lines between photos
        // still produce a side-by-side gallery.
        const grouped = [...images];
        let lookAhead = index + 1;
        while (lookAhead < parent.children.length) {
          const sibling = parent.children[lookAhead];
          if (isWhitespace(sibling)) {
            lookAhead += 1;
            continue;
          }
          if (sibling.type === 'element' && sibling.tagName === 'p') {
            const more = imageChildren(sibling);
            if (more.length > 0) {
              grouped.push(...more);
              lookAhead += 1;
              continue;
            }
          }
          break;
        }
        index = lookAhead - 1;
        next.push(grouped.length === 1 ? figureForImage(grouped[0]) : galleryForImages(grouped));
        continue;
      }
    }

    visit(child);
    next.push(child);
  }

  parent.children = next;
}

export function rehypeImageGroups() {
  return (tree) => visit(tree);
}
