<script lang="ts">
  // https://github.com/sveltejs/svelte/issues/7082#issuecomment-1821787174
  
  import { getAllContexts, mount, unmount } from "svelte";
  import type { MountOptions } from "svelte";

  import type { ChildrenProp } from "$lib/utils/svelte";
  import { isString, isUndefined } from "$lib/utils/typeCheck";

  import PortalRender from "./PortalRender.svelte";

  type TargetType = MountOptions['target'];

  interface Props extends ChildrenProp {
    target?: TargetType | string;
  }

  const { target, children }: Props = $props();

  const context = getAllContexts(); // do not move to $effect

  $effect(() => {
    const targetEl = evalTarget(target);
    
    const instance = mount(PortalRender, {
      target: targetEl,
      props: { children },
      context,
    });

    return () => {
      void unmount(instance)
    };
  });

  function evalTarget(targetEl: Props['target']) {
    if(isUndefined(targetEl))
      return document.body;
    if(isString(targetEl)){
      const el = document.querySelector(targetEl as string);
      if (!el) throw new Error(`Invalid css selector: "${targetEl as string}"`);
      return el;
    }
    return targetEl as TargetType;
  }

</script>
