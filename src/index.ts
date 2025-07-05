export interface Env {
  AI: any; // AI binding'ini tanımla
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("prompt");

    if (!prompt) {
      return new Response("Prompt parametresi eksik. Örn: ?prompt=cat+in+space", { status: 400 });
    }

    try {
      const inputs = {
        prompt: prompt,
      };

      const aiResponse = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs
      );

      return new Response(aiResponse, {
        headers: {
          "content-type": "image/png",
        },
      });
    } catch (err) {
      return new Response("Görsel oluşturulurken hata oluştu:\n" + String(err), {
        status: 500,
      });
    }
  },
};
