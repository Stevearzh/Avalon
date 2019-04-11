export const cleanChannel = (channel?: string): string => {
  if (!channel) {
    return '';
  }

  const tmp = channel.split('#');
  return tmp[tmp.length - 1];
};
