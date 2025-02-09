<script lang="ts">
  import type { ChildrenProp } from "$lib/utils/svelte";
  const { children }: ChildrenProp = $props();
</script>

{@render children?.()}