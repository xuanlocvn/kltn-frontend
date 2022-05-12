import { create } from 'ipfs-http-client';

const ipfsClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const AddDataToIPFS = async (obj: any): Promise<string> => {
  const added = await ipfsClient.add(JSON.stringify(obj));
  return added.path;
};
export const ipfsBaseURL = 'https://ipfs.infura.io/ipfs/';

export default ipfsClient;
