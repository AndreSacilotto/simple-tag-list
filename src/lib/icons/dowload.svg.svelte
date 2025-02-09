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
>
  <path
    d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM160-160v-200h80v120h480v-120h80v200H160Z"
  />
</svg>
