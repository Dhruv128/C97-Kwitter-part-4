//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyCYXE897whI1VLLi7fkv30xOmEpOy-0G-g",
      authDomain: "kwitter-51ce7.firebaseapp.com",
      databaseURL: "https://kwitter-51ce7-default-rtdb.firebaseio.com",
      projectId: "kwitter-51ce7",
      storageBucket: "kwitter-51ce7.appspot.com",
      messagingSenderId: "421041234352",
      appId: "1:421041234352:web:bbb16109d3be3cc5f87675"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         user_name=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         user_name_with_tag="<h4>"+user_name+"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_with_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>"

         row=user_name_with_tag+message_with_tag+like_with_tag+span_tag;
         document.getElementById("output").innerHTML+=row;
      } });  });

}
getData();
function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value="";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}
function updateLike(message_id){
      button_id=message_id;
      console.log(button_id);
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
