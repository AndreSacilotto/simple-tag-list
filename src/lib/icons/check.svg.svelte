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
  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
</svg>
