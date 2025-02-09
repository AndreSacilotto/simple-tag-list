<script lang="ts">
  import type { HtmlProps } from "$lib/utils/svelte";

  const { width = "24px", height = "24px", ...props }: HtmlProps<"svg"> = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 -960 960 960"
  {...props}
  fill="currentColor"
  {width}
  {height}
>
  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
</svg>
