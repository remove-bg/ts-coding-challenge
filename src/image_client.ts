/**
 * A client to download image URLs with.
 * You can assume you will be supplied with a working implementation.
 * You do not need to implement this class yourself.
 */
export class ImageClient {
  /**
   * Downloads the image referenced by url.
   *
   * @param url - The url of the image to download.
   * @returns The image data in bytes.
   */
  public async getImage(url: string): Promise<string> {
    return Promise.resolve(url);
  }
}
