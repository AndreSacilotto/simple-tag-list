import { arrayRemoveOnce } from "$lib/utils/collection";
import type { TagItem } from "./tags.svelte";

export interface TaggableItem
{
  content: string;
  tags: TagItem[];
}

export interface TaggableItemSerialized
{
  content: string;
  tags: string[];
}

export class TaggableList
{
  private taggable = $state<TaggableItem[]>([]);

  static newItem()
  {
    return {
      content: "",
      tags: [],
    } as TaggableItem;
  }

  get items() { return this.taggable }
  set items(value: TaggableItem[]) { this.taggable = value }

  add(item: TaggableItem)
  {
    this.taggable.push(item);
  }

  remove(item: TaggableItem)
  {
    arrayRemoveOnce(this.taggable, item);
  }

  serialize()
  {
    const ser = this.taggable.map(x =>
    {
      return {
        content: x.content,
        tags: x.tags.map(k => k.name)
      }
    })
    return JSON.stringify(ser);
  }
  
  deserialize(serialized: string)
  {
    const des = JSON.parse(serialized) as TaggableItemSerialized;
    return des;
  }
}

const taggableList = new TaggableList()

export default taggableList;
