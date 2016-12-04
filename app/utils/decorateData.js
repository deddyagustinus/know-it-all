import { SCORES } from '../constants';

let rowCount;
let depth = 0;
const itemList = [];

function parseData(items, path = []) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.isExpanded = depth < 0;
    item.row = rowCount++;
    item.depth = depth;
    item.path = path.slice();
    item.path.push(i); // TODO (davidg): I'm overdoing the path thing, fix this
    item.pathString = item.path.join(`.`);
    item.leaf = !item.children || !item.children.length; // TODO (davidg): or tag == fake?
    item.score = SCORES.LEVEL_0; // TODO (davidg): mush with saved data?

    itemList.push({
      name: item.name,
      id: item.id,
      row: item.row,
      path: item.path,
      pathString: item.pathString,
      leaf: item.leaf,
    });

    if (item.children && item.children.length) {
      depth++;
      parseData(item.children, item.path);
      depth--;
    }
  }

  return items;
}

export function decorateData(originalItemTree) {
  rowCount = 0;
  depth = 0;
  itemList.length = 0;

  const itemTree = parseData(originalItemTree.slice());

  return {
    itemTree,
    itemList,
  };
}