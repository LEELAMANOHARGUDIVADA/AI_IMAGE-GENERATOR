import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });

async function main() {
  const image = await openai.images.generate({ 
    prompt: "Kingfisher Bird",
    n: 1,
    size: "1024x1024"
 });

  console.log(image.data);
}
main();