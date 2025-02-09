import { arrayRemoveOnce } from "$lib/utils/collection";

export interface TagItem
{
  name: string;
  color: string;
  description: string;
  // value: number;
}

export class TagList
{
  private tags = $state<TagItem[]>([]);

  static newItem()
  {
    return {
      name: "",
      color: "#fff",
      description: "",
      // value: 0,
    } as TagItem;
  }

  get items() { return this.tags }
  set items(value: TagItem[]) { this.tags = value }

  add(item: TagItem)
  {
    const result = this.tags.findIndex((x) => x.name === item.name) === -1
    if(result)
      this.tags.push(item);
    return result
  }

  remove(item: TagItem)
  {
    arrayRemoveOnce(this.tags, item);
  }

  serialize()
  {
    const ser = JSON.stringify(this.tags)
    return ser;
  }
  deserialize(serialized: string)
  {
    const des = JSON.parse(serialized) as TagItem[]
    return des;
  }
}

const tagList = new TagList()

export default tagList;
