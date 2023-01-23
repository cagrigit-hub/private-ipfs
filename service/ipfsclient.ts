import { create } from "ipfs-http-client";

const auth =
  "Basic " +
  Buffer.from(
    process.env.NEXT_PUBLIC_INFURA_ID + ":" + process.env.NEXT_PUBLIC_INFURA_KEY
  ).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default client;
