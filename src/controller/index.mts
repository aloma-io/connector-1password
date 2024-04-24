import { AbstractController } from "@aloma.io/integration-sdk";
import { z } from "zod";

export default class Controller extends AbstractController {
  private api: any;

  protected async start(): Promise<void> {
    const config = this.config;

    const needed = z.object({
      url: z.string().min(1),
      apiKey: z.string().min(1),
    });

    try {
      needed.parse(config);
    } catch (e: any) {
      console.log(
        "configuration error:" +
          "\n" +
          e.errors
            .map((err) => `${err.message}: ${err.path.join("/")}`)
            .join("\n"),
      );
      return;
    }

    this.api = this.getClient({
      baseUrl: config.url,
      customize: (request) => {
        request.headers ||= {};
        request.headers.Authorization = `Bearer ${config.apiKey}`;
      },
    });
  }

  /**
   * do a rest request against the 1password connect server api
   * @see https://developer.1password.com/docs/connect/connect-api-reference/
   * @param url - URL of the api, e.g. `vaults/{vaultUUID}`
   * @param options - Options of the request 
     \@example usage
   * ```javascript
   * options: {
   *   method: 'POST',
   *   headers: {
   *     'X': 'Y',
   *   },
   *   body: {a: true}
   * }
   * ```
   *
   * @example
   * ```javascript
   * const vault = request({url: 'vaults/{vaultUUID}'})
   * ```
   **/
  async request({ url, options }: { url: string; options: any }) {
    return this.api.fetch(url, options);
  }
}
