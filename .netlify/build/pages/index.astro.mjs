import { e as createComponent, r as renderTemplate, g as addAttribute, i as renderScript, h as createAstro, j as renderComponent, k as renderHead, l as renderSlot } from '../chunks/astro/server_DXfMNu8m.mjs';
import 'kleur/colors';
import 'html-escaper';
/* empty css                                 */
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/home/justinprime/github/numenera-sheet/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/justinprime/github/numenera-sheet/node_modules/astro/components/ClientRouter.astro", undefined);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Numenera Character Sheet" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body> <!-- <div class="Page" transition:animate="fade"> --> <div class="Page"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/home/justinprime/github/numenera-sheet/src/layouts/Layout.astro", undefined);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Numenera", null, { "client:only": "svelte", "client:component-hydration": "only", "client:component-path": "@components/game/Numenera.svelte", "client:component-export": "default" })} ` })}`;
}, "/home/justinprime/github/numenera-sheet/src/pages/index.astro", undefined);

const $$file = "/home/justinprime/github/numenera-sheet/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
