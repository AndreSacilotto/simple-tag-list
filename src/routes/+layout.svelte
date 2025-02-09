<script lang="ts">
  import "../app.css";

  import { beforeNavigate, goto } from "$app/navigation";
  import { page } from "$app/state";

  import type { LayoutProp } from "$lib/utils/svelte";

  const { children }: LayoutProp = $props();

  function createRoute(href: string) {
    const str = href[1].toUpperCase() + href.substring(2);
    return { href, label: str };
  }

  const routes = [
    // { href: "/", label: "Home" },
    createRoute("/list"),
    createRoute("/tags"),
    createRoute("/load"),
    createRoute("/icons"),
  ];
</script>

<header role="tablist" class="tabs tabs-box flex justify-center gap-4 rounded-none sticky z-10 top-0">
  {#each routes as r}
    <a
      role="tab"
      class="tab"
      class:tab-active={page.url.pathname === r.href}
      href={r.href}
    >
      {r.label}
    </a>
  {/each}
</header>

{@render children()}

<style lang="scss">
  
:global(body){
  display: flex;
  flex-direction: column;
}

</style>
