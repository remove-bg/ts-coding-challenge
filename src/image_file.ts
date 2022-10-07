import * as fs from 'fs';
import * as path from 'path';

/**
 * Convenient File handling utilities.
 * This module has some file handling functions that are
 * available for convenience or to jog your memory.
 * In your implementation of the cache, you may choose to use all,
 * some or none of the functions listed here.
 */
export class ImageFile {
  /**
   * Utility function to write bytes to a file path.
   * Takes care of creating the directory if it doesn't exist.
   *
   * @param path - The path to write the file to.
   * @param bytes - The data to write to the file.
   */
  public static write(storePath: string, bytes: string): void {
    const dir = path.dirname(storePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.writeFileSync(storePath, bytes);
  }

  /**
   * Utility function to delete a file path.
   *
   * @param path - The path of the file to be deleted
   */
  public static delete(path: string): void {
    fs.unlinkSync(path);
  }

  /**
   * Utility function to confirm whether a file path exists or not.
   *
   * @param path - The path of the file to be checked
   * @returns True if the file exists, false otherwise.
   */
  public static exists(path: string): boolean {
    return fs.existsSync(path);
  }
}
