export const userSelect = {
  first_name: true,
  last_name: true,
  username: true,
  avatar: true,
  status: true,
  role: {
    select: {
      name: true,
    },
  },
};
