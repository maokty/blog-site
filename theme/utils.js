function createToc(name) {
  return [
    'li',
    ['a', { className: 'bisheng-toc-h2', href: `#${name}` }, name]
  ]
}

export function formatContent(content) {
  let toc = [];
  let _content = content.map((item) => {
    if (item && item instanceof Array && item.length > 1 && item[0] === 'h2') {
      let item1 = item[1];
      toc.push(createToc(item1));
      item = [item[0], { id: item1 }, item1];
    }

    return item;
  });

  return {
    content: _content,
    toc
  };
}