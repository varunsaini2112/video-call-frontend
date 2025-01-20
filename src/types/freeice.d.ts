declare module "freeice" {
  interface FreeIceOptions {
    stun?: string[] | string; // Custom STUN server(s) or file path to STUN configuration
    turn?: string[] | string; // Custom TURN server(s) or file path to TURN configuration
    stunCount?: number; // Number of STUN servers to include
    turnCount?: number; // Number of TURN servers to include
  }

  interface IceServer {
    urls: string; // ICE server URL (STUN or TURN)
    [key: string]: any; // Allow additional TURN-specific options (e.g., username, credential)
  }

  /**
   * Generates a list of ICE server configurations.
   * @param opts Options to customize the selection of ICE servers.
   * @returns An array of ICE server objects.
   */
  function freeice(opts?: FreeIceOptions): IceServer[];

  export = freeice;
}
