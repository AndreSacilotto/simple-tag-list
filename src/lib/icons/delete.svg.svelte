<script lang="ts">
  import type { HtmlProps } from "$lib/utils/svelte";

  const {
    width = "24px",
    height = "24px",
    ...props
  }: HtmlProps<"svg"> = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 -960 960 960"
  {...props}
  fill="currentColor"
  {width}
  {height}
  ><path
    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120zm400-600H280v520h400zM360-280h80v-360h-80zm160 0h80v-360h-80zM280-720v520z"
  /></svg
>
