const handler = async (request, context) => {
  return new Response("Hello from Edge!", {
    headers: { "content-type": "text/plain" },
  });
};

export default handler;
