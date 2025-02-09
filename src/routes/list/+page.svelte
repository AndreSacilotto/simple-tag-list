<script lang="ts">
  import { arrayRemoveOnce } from "$lib/utils/collection";
  import {
    contrastColor,
    contrastColorToHex,
    hexToRgb,
  } from "$lib/utils/color";
  import { randomString } from "$lib/utils/random";

  import Portal from "$lib/components/Portal/Portal.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import AddSvg from "$lib/icons/add.svg.svelte";
  import DeleteSvg from "$lib/icons/delete.svg.svelte";

  import taggableList, {
    TaggableList,
    type TaggableItem,
  } from "$lib/store/taggables.svelte";
  import tagList, { type TagItem } from "$lib/store/tags.svelte";

  let openFilterTags = $state(false);
  let filterTags: TagItem[] = $state([]);

  let visibleTaggableList: TaggableItem[] = $derived.by(() => {
    const filter = filterTags;
    const items = taggableList.items;

    if(filter.length === 0)
      return items

    const filteredItems = [];
    for (const item of items) {
      if (item.tags.length > 0 && item.tags.every((tag) => filter.includes(tag))){
        filteredItems.push(item);
      }
    }
    return filteredItems
  });

  // $inspect(filterTags);
  // $inspect(visibleTaggableList);

  function handleSort(dir: number) {
    taggableList.items.sort((a, b) => dir * a.content.localeCompare(b.content));
  }

  function handleAddTaggable() {
    taggableList.add({
      content: randomString(),
      tags: [],
    });
  }

  let openTagsSelector = $state(false);
  let currentTaggable = $state(TaggableList.newItem());
  function handleAddTaggableTag(taggable: TaggableItem) {
    currentTaggable = taggable;
    openTagsSelector = true;
  }

  function handleKeydown(ev: KeyboardEvent) {
    if (openFilterTags && ev.key === "esc") openFilterTags = false;

    if (ev.ctrlKey) {
      if (ev.key === "b") {
        handleAddTaggable();
        ev.preventDefault();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="h-fit px-[10%] py-10">
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-2">
      <button class="btn btn-sm flex-1" onclick={handleAddTaggable}>
        <AddSvg class="min-w-6 min-h-6"></AddSvg>
      </button>
      <button class="btn btn-sm" onclick={() => handleSort(1)}> Sort A </button>
      <button class="btn btn-sm" onclick={() => handleSort(-1)}> Sort Z</button>
      <button class="btn btn-sm" onclick={() => (openFilterTags = true)}>
        Filter Tags
      </button>
    </div>
    <div class="grid grid-cols-2 gap-6">
      {#each visibleTaggableList as taggable}
        <div
          class="flex flex-row flex-wrap content-start gap-1 w-full px-4 py-2 rounded-2xl bg-base-100 border border-base-300"
        >
          <div class="w-full flex gap-1 mb-1">
            <input
              type="text"
              class="input input-sm flex-1"
              bind:value={taggable.content}
            />
            <button
              class="btn btn-sm"
              onclick={() => taggableList.remove(taggable)}
            >
              <DeleteSvg></DeleteSvg>
            </button>
          </div>
          <button
            class="btn btn-xs !rounded-full p-0"
            onclick={() => handleAddTaggableTag(taggable)}
          >
            <AddSvg class="text-gray-400"></AddSvg>
          </button>
          {#each taggable.tags as tag}
            <button
              class="badge"
              style:background-color={tag.color}
              style:color={contrastColorToHex(
                contrastColor(hexToRgb(tag.color))
              )}
              onclick={() => arrayRemoveOnce(taggable.tags, tag)}
              >{tag.name}</button
            >
          {/each}
        </div>
      {/each}
    </div>

    <div class="w-full flex justify-center mt-2">
      <button class="btn btn-xs w-1/3" onclick={handleAddTaggable}>
        <AddSvg class="min-w-6 min-h-6"></AddSvg>
      </button>
    </div>
  </div>
</div>

<Portal>
  <Modal bind:open={openTagsSelector}>
    <div class="w-1/2 h-1/2 p-2 bg-white rounded-2xl">
      <select
        name="tagsSelect"
        class="w-full h-full"
        multiple
        bind:value={currentTaggable.tags}
      >
        {#each tagList.items as tag}
          <option value={tag} class="outline outline-base-300 px-4 py-1"
            >{tag.name}</option
          >
        {/each}
      </select>
    </div>
  </Modal>
  <Modal bind:open={openFilterTags}>
    <div class="w-1/2 h-1/2 p-2 bg-white rounded-2xl">
      <select
        name="tagsSelect"
        class="w-full h-full"
        multiple
        bind:value={filterTags}
      >
        {#each tagList.items as tag}
          <option value={tag} class="outline outline-base-300 px-4 py-1"
            >{tag.name}</option
          >
        {/each}
      </select>
    </div>
  </Modal>
</Portal>
