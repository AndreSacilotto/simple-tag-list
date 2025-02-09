<script lang="ts">
  import { type Component } from "svelte";
  import type { SVGAttributes } from "svelte/elements";

  type IconComponent = Component<
    SVGAttributes<SVGSVGElement>,
    Record<string, unknown>,
    ""
  >;

  const blob = import.meta.glob("$lib/icons/*.svg.svelte", {
    import: "default",
    eager: true,
  });

  const obj = Object.entries(blob).map(([key, value]) => {
    const fileName = key.split("/").pop()?.split(".")[0] ?? "";
    return {
      Icon: value as IconComponent,
      text: fileName[0].toUpperCase() + fileName.substring(1),
    };
  });

  let components = $state(obj);

  // let SingleIcon: Component | undefined = $state();
  // onMount(async () => {
  //   const blob = await import("$lib/icons/close.svg.svelte");
  //   SingleIcon = blob.default as IconComponent;
  // });
</script>

<div
  class="flex flex-row flex-wrap content-start justify-evenly gap-4 py-2 text-cyan-400"
>
  {#each components as component}
    <div class="flex flex-col items-center">
      <div
        class="svg-icon border border-black text-red-400"
      >
        <component.Icon width="32px" height="32px" />
      </div>
      <span>{component.text}</span>
    </div>
  {/each}
</div>

<style lang="scss">
</style>
