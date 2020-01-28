import {User} from "../interfaces/User";

export const getAutoSuggestUsers = (
    users: User[],
    loginSubstring: string,
    limit: number
): User[] => {
  const suggestions = users.filter(user => user.login.includes(loginSubstring));
  return suggestions.slice(0, limit);
};

