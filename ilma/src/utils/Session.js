class Session {

    static userObj = [];
    static appSettings = [];
    static companySettings = [];
    static companyPackages = [];
    static userObj = [];
    static signInObj = {
        email: "",
        password: ""
    }


    static cleanUserObj() {
        this.userObj = []
    }
    static checkListData = [];

    static signUp = {
        firstName: "",
        lastName: "",
        mobile: "",
        password: ""
    }
    static singIn = {
        mobile: "",
        password: "",
    }






}

export default Session;