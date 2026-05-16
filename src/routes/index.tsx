import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "707 Herbal Tea — Naturally Pure Wellness Treats by Chiwendu Kalu" },
      {
        name: "description",
        content:
          "707 Herbal Tea — whole-herb, naturally pure blends crafted for genuine flavor and consistent daily wellness. Shop lavender, saffron, rose buds, calendula, spearmint, lemongrass and raw honey.",
      },
      { property: "og:title", content: "707 Herbal Tea — Naturally Pure Wellness Treats" },
      {
        property: "og:description",
        content: "Whole-herb blends for calm, balance and intentional living. Now shipping across Nigeria.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/707/index.html"
      title="707 Herbal Tea"
      style={{ border: 0, width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
