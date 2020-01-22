import {UserInterface} from "../interfaces/User.interface";

export const getAutoSuggestedUsers = (
    users: UserInterface[],
    loginSubstring: string,
    limit: number
): UserInterface[] => {
  const suggestions = users.filter(user => user.login.includes(loginSubstring));
  return suggestions.slice(0, limit);
};

