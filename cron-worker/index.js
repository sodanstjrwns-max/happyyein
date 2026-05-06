export default {
  async scheduled(event, env, ctx) {
    const res = await fetch(env.BLOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.AUTO_BLOG_SECRET}`,
      },
    });
    const data = await res.json();
    console.log("Auto blog result:", JSON.stringify(data));
  },

  async fetch(request, env) {
    return new Response("Happyyein Cron Worker - triggers daily blog post at 7AM KST");
  },
};
