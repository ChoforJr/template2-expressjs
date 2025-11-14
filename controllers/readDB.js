export async function homePageGet(req, res) {
  const messages = await getMessages();
  res.render("index", {
    script: "index.js",
    style: "style.css",
    currentUser: req.user,
    messages: messages,
  });
}

export async function signUpPageGet(req, res) {
  res.render("signUp", {
    email: "",
    password: "",
    confirmPassword: "",
  });
}

export async function logInPageGet(req, res) {
  res.render("logIn", {
    email: "",
    password: "",
  });
}
