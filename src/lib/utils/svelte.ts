import type { Snippet } from "svelte";
import type { HTMLAttributes, SvelteHTMLElements } from "svelte/elements";
import type { OmitIndexer } from "./types";

export type HtmlElementsKeys = keyof OmitIndexer<SvelteHTMLElements, string>;

export type HtmlProps<T extends HtmlElementsKeys> = SvelteHTMLElements[T];

export interface ChildrenProp
{
  children?: Snippet;
}

export interface LayoutProp
{
  children: Snippet;
}

export type ClassName = Exclude<HTMLAttributes<EventTarget>['class'], undefined | null>;