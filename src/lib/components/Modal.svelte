<script lang="ts">
  import type { HtmlProps } from "$lib/utils/svelte";

  type ViewAnchor =
    | "top-left"
    | "top-center"
    | "top-right"
    | "middle-left"
    | "middle-center"
    | "middle-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  interface Props extends HtmlProps<"dialog"> {
    position?: ViewAnchor;
    open?: boolean;
  }

  let {
    position = "middle-center",
    open = $bindable(true),
    children,
    ...props
  }: Props = $props();

  function handleKeydown(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      open = false;
    }
  }

  function backdropClick() {
    open = false;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- {#if visible} -->
<dialog
  aria-modal="true"
  {open}
  {...props}
  class={["fixed inset-0 z-10", props.class]}
>
  <div
    role="none"
    tabindex="-1"
    class="fixed inset-0 bg-black/30 -z-10"
    onclick={backdropClick}
  ></div>
  <div class={["fixed inset-0 flex pointer-events-none [&>*]:pointer-events-auto", position]}>
    {@render children?.()}
  </div>
</dialog>

<!-- {/if} -->

<style>
  .top-left,
  .middle-left,
  .bottom-left {
    justify-content: flex-start;
  }
  .top-center,
  .middle-center,
  .bottom-center {
    justify-content: center;
  }
  .top-right,
  .middle-right,
  .bottom-right {
    justify-content: flex-end;
  }

  .top-left,
  .top-center,
  .top-right {
    align-items: flex-start;
  }
  .middle-left,
  .middle-center,
  .middle-right {
    align-items: center;
  }
  .bottom-left,
  .bottom-center,
  .bottom-right {
    align-items: flex-end;
  }
</style>
