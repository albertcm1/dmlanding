type Env = {
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
};

type ContactConfigContext = { env: Env };

export const onRequestGet = async ({ env }: ContactConfigContext) => new Response(
  JSON.stringify({ siteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "" }),
  {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  },
);
