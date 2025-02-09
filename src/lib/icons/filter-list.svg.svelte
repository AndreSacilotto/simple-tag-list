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
    d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"
  />
</svg>
