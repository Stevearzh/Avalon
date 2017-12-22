export const cleanChannel = (channel: string): string => {
  const tmp = channel.split('#');
  return tmp[tmp.length - 1];
};
