import { Builder } from "@aloma.io/integration-sdk";

const builder = new Builder();

builder.config({
  description: `This connector connects to a [1password connect server](https://developer.1password.com/docs/connect/).`,
  fields: {
    apiKey: {
      name: "API Access Token",
      placeholder: "e.g. abcde",
      type: "line",
      description: `To get a token, see [here](https://developer.1password.com/docs/connect/manage-connect/#create-a-token).`,
    },
    url: {
      name: "Server URL",
      placeholder: "e.g. https://example.com/v1/",
      type: "line",
      plain: true,
    },
  },
});

const runtime = await builder.build();

await runtime.start();
