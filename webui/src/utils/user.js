export const USER = {
    isAuthUser: (user) => {
        if (user && user.isAuth === true && user.isError === false) {
            return true;
        }
        return false;
    },
    isAnonimusUser: (user) => {
        if (user && user.IsAuth === true && user.isAnonimus === true && user.isError === false) {
            return true;
        }
        return false;
    },
    isRegularUser: (user) => {
        if (user && user.isAuth === true && user.isAnonimus === false && user.isError === false) {
            return true;
        }
        return false;
    },
    isAuthError: (user) => {
        if (user && user.isError) {
            return true;
        }
        return false;
    }
};
