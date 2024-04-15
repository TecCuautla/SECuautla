const firebaseConfig = {
  apiKey: "AIzaSyBnMfw7S0gaXU-S8CSmXbripsIPIXYLo8c",
  authDomain: "sistemas-estrategico-itc.firebaseapp.com",
  projectId: "sistemas-estrategico-itc",
  storageBucket: "sistemas-estrategico-itc.appspot.com",
  messagingSenderId: "218828884238",
  appId: "1:218828884238:web:c20003cdd5d6fc58b5af5f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

var DataUser = [];

// Login
const loginUser = () => {
  let email = $("#email-user").val();
  let pass = $("#pass-user").val();

  $("#loader-user").removeClass("d-none");

  db.collection("users")
    .where("User", "==", email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        console.log(data);
        console.log(pass);
        if (doc.exists) {
          if (data.password === pass) {

            setTimeout(() => {
              location.href = data.Vista;
              localStorage.setItem("DataUserLocal",JSON.stringify(data));
            }, 3000);
          } else {
            setTimeout(() => {
              $("#loader-user").addClass("d-none");

              tata.error("Sistema Estratègico", "Error en credenciales", {
                position: "tm",
                closeBtn: false,
              });
            }, 2000);
          }
        }
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};
