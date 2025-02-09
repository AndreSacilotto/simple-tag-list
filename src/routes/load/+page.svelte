<script lang="ts">
  import taggableList, {
    type TaggableItem,
    type TaggableItemSerialized,
  } from "$lib/store/taggables.svelte";
  import tagList, { type TagItem } from "$lib/store/tags.svelte";
  import { randomColor } from "$lib/utils/random";

  function save() {
    const ser = `{ "tags": ${tagList.serialize()}, "taggables": ${taggableList.serialize()} }`;

    void navigator.clipboard.writeText(ser);
    alert(ser);
  }

  function load() {
    const str = prompt("Load here:");
    if (!str) return;

    const des = JSON.parse(str) as {
      tags: TagItem[];
      taggables: TaggableItemSerialized[];
    };

    tagList.items = des.tags;
    taggableList.items = des.taggables.map((x) => {
      const tagNames = new Set(x.tags);
      return {
        content: x.content,
        tags: des.tags.filter((k) => tagNames.has(k.name)),
      };
    });
  }

  function exportCSV(separator = "\t") {
    const items = [["", ...tagList.items.map((x) => JSON.stringify(x))]];

    for (const taggable of taggableList.items) {
      const row = [taggable.content];

      const tagNames = new Set(taggable.tags.map((x) => x.name));
      for (const tag of tagList.items)
        row.push(tagNames.has(tag.name) ? "true" : "false");

      items.push(row);
    }

    const result = items.map((row) => row.join(separator)).join("\n");

    void navigator.clipboard.writeText(result);
    alert(result);
  }

  function importCSV(separator = "\t") {
    const str = prompt("Import here:");
    if (!str) return;

    const arr = str.split("\n").map((row) => row.split(separator));

    const tags: TagItem[] = [];
    for (let i = 1; i < arr[0].length; i++) {
      tags.push(JSON.parse(arr[0][i]) as TagItem);
    }

    const taggables: TaggableItem[] = [];
    for (let i = 1; i < arr.length; i++) {
      const item = {
        content: arr[i][0],
        tags: [],
      } as TaggableItem;
      const row = arr[i];
      for (let j = 1; j < row.length; j++) {
        if (row[j] === "true") item.tags.push(tags[j - 1]);
      }
      taggables.push(item);
    }

    tagList.items = tags;
    taggableList.items = taggables;
  }
</script>

<div class="w-full h-full py-10 flex flex-col justify-start items-center gap-4">
  <div>
    <button class="btn btn-lg" onclick={() => save()}> Save </button>
    <button class="btn btn-lg" onclick={() => load()}> Load </button>
  </div>
  <div>
    <button class="btn btn-lg" onclick={() => exportCSV()}> Export CSV </button>
    <button class="btn btn-lg" onclick={() => importCSV()}> Import CSV </button>
  </div>
</div>
