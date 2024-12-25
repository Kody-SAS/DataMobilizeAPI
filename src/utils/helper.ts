export const transformData = (data) => {
  const result = [];
  data.forEach(({ users, reports }) => {
    let user = result.find((item) => item.id === users.id);
    if (!user) {
      user = {
        id: users.id,
        username: users.username || "",
        email: users.email || "",
        reports: [],
      };
      result.push(user);
    }
    if (reports.id) {
      user.reports.push({
        id: reports.id,
        description: reports.description || "",
        type: reports.type || "",
        localisation: reports.localisation || "",
      });
    }
  });
  return result;
};
