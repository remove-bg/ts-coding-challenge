import * as fs from 'fs';
import { ImageClient } from './image_client';
import { ImageCache } from './image_cache';

describe('ImageCache', () => {
  const getImageMock = jest
    .spyOn(ImageClient.prototype, 'getImage')
    .mockImplementation(() => {
      return Promise.resolve('mock image data');
    });

  let imageCache: ImageCache;

  beforeEach(() => {
    imageCache = new ImageCache(new ImageClient());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('lease', () => {
    it('returns from cache when present', async () => {
      const url = 'http://canva-interview.com/image.png';

      // populate the cache
      const image1 = await imageCache.lease(url);

      // request the same image a second time
      const image2 = await imageCache.lease(url);

      // assert that each subsequent call to lease returned the same File
      // reference for the cached image
      expect(image1).toEqual(image2);
      // and that the image_client was only called once with this url
      expect(getImageMock).toHaveBeenCalledTimes(1);
      expect(getImageMock).toHaveBeenCalledWith(url);

      // release the image as many times as leased to enable cleanup
      imageCache.release(url);
      imageCache.release(url);
    });

    it('does not return the same image for different urls', async () => {
      const url1 = 'http://canva-interview.com/image1.png';
      const url2 = 'http://canva-interview.com/image2.png';

      // populate the cache
      const image1 = await imageCache.lease(url1);
      const image2 = await imageCache.lease(url2);

      // assert that each subsequent call to lease returned a different File
      // reference for the cached image
      expect(image1).not.toEqual(image2);
      // and that the image_client was called twice, once with each url
      expect(getImageMock).toHaveBeenCalledTimes(2);
      expect(getImageMock).toHaveBeenCalledWith(url1);
      expect(getImageMock).toHaveBeenCalledWith(url2);

      // release the images as many times as leased to enable cleanup
      imageCache.release(url1);
      imageCache.release(url2);
    });
  });

  describe('release', () => {
    it('removes the image from the cache when all leases are released', async () => {
      const url = 'http://canva-interview.com/image.png';

      // lease the same image twice
      await imageCache.lease(url);
      const image = await imageCache.lease(url);

      // assert that the image is present on the filesystem
      expect(fs.existsSync(image)).toBe(true);

      // release the image once
      imageCache.release(url);

      // assert that the image is still present on the filesystem
      expect(fs.existsSync(image)).toBe(true);

      // release the image again
      imageCache.release(url);

      // assert that the image is no longer present on the filesystem
      expect(fs.existsSync(image)).toBe(false);
    });
  });
});
