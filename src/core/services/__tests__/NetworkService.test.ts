import NetworkService, { axiosService, Endpoints } from '../NetworkService';

describe('NetworkService', () => {
  describe('getPosts', () => {
    it('returns data when getPosts is called successfully', async () => {
      const mockResponse = {
        data: [{ id: 1, title: 'Post Title', body: 'Post Body' }],
      };

      jest.spyOn(axiosService, 'get').mockResolvedValue(mockResponse);

      const result = await NetworkService.shared.getPosts();

      expect(result).toEqual(mockResponse.data);
      expect(axiosService.get).toHaveBeenCalledWith(Endpoints.POSTS);
    });

    it('throws an error when no data is returned', async () => {
      jest.spyOn(axiosService, 'get').mockResolvedValue({});

      const result = await NetworkService.shared.getPosts();

      expect(result).toBeUndefined();
    });

    it('logs error and returns undefined when axiosService.get fails', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const error = new Error('Request failed');

      jest.spyOn(axiosService, 'get').mockRejectedValue(error);

      const result = await NetworkService.shared.getPosts();

      expect(consoleSpy).toHaveBeenCalledWith(error);
      expect(result).toBeUndefined();

      consoleSpy.mockRestore();
    });
  });
});
