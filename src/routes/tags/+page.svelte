<script lang="ts">
  import { randomColor, randomString } from "$lib/utils/random";
  import Portal from "$lib/components/Portal/Portal.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import AddSvg from "$lib/icons/add.svg.svelte";
  import DeleteSvg from "$lib/icons/delete.svg.svelte";

  import tagList, { TagList, type TagItem } from "$lib/store/tags.svelte";
  import taggableList from "$lib/store/taggables.svelte";
  import { arrayRemoveOnce } from "$lib/utils/collection";

  let open = $state(false);

  function handleSort(dir: number) {
    const sortFn = (a: TagItem, b: TagItem) => dir * a.name.localeCompare(b.name)
    tagList.items.sort(sortFn);
    taggableList.items.forEach(x => x.tags.sort(sortFn))
  }

  function handleAddItem() {
    tagList.add({
      name: randomString(),
      color: randomColor(),
      description: "",
      // value: 0,
    });
  }

  function handleRemoveItem(tag: TagItem) {
    tagList.remove(tag)
    taggableList.items.forEach(x => arrayRemoveOnce(x.tags, tag))
  }

  let currentTag = $state(TagList.newItem());
  function handleDescriptionModal(tag: TagItem) {
    currentTag = tag;
    open = true;
  }

  function handleKeydown(ev: KeyboardEvent) {
    if (open && ev.key === "esc") open = false;
    if (ev.ctrlKey) {
      if (ev.key === "b") {
        handleAddItem();
        ev.preventDefault();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="h-fit px-[10%] py-10">
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-2">
      <button class="btn btn-sm flex-1" onclick={handleAddItem}>
        <AddSvg class="min-w-6 min-h-6"></AddSvg>
      </button>
      <button class="btn btn-sm" onclick={() => handleSort(1)}> Sort A </button>
      <button class="btn btn-sm" onclick={() => handleSort(-1)}>
        Sort Z
      </button>
    </div>
    <div class="grid grid-cols-3 gap-6">
      {#each tagList.items as tag}
        <div
          class="flex flex-row flex-wrap justify-between items-center gap-1 px-4 py-2 rounded-2xl bg-base-100 border border-base-300"
        >
          <div class="w-full flex gap-1">
            <input type="text" class="input input-sm flex-1" bind:value={tag.name} />
            <button class="btn btn-sm" onclick={() => handleRemoveItem(tag)}>
              <DeleteSvg></DeleteSvg>
            </button>
          </div>
          <!-- <input
            type="number"
            min="-100"
            max="100"
            class="input w-14"
            bind:value={tag.value}
          /> -->
          <input
          type="color"
          title="Color Picker"
          class="input p-0 border-none h-10 flex-1 cursor-pointer dark:bg-neutral-900 dark:border-neutral-700"
          bind:value={tag.color}
          />
          <button class="btn btn-sm" onclick={() => handleDescriptionModal(tag)}
            >Description</button
          >

        </div>
      {/each}
    </div>

    <div class="w-full flex justify-center mt-2">
      <button class="btn btn-xs w-1/3" onclick={handleAddItem}>
        <AddSvg class="min-w-6 min-h-6"></AddSvg>
      </button>
    </div>
  </div>
</div>

<Portal>
  <Modal bind:open>
    <div class="w-1/2 h-1/2 p-2 bg-white rounded-2xl">
      <textarea
        placeholder="Description"
        class="resize-none textarea w-full h-full"
        bind:value={currentTag.description}
      ></textarea>
    </div>
  </Modal>
</Portal>
