/** The one seam the GameController talks to: raw JSON string in, raw JSON string out. */
export interface CoreTransport {
  call(commandJson: string): string;
}
