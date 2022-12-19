const { ipcMain } = require("electron")
const Mongoose = require("mongoose");
const User = require("../models/User");
const Template = require("../models/Template");
const CryptoJS = require("crypto-js");
const { passwordToHash } = require("../scripts/utils/helper");
const Alert = require("electron-alert");
const db = Mongoose.connection;
const nodemailer = require('nodemailer');
var val = 0;
var userForChangePassword;
var usernameForlike;

db.once("open", () => {
  console.log("Connected to database..");
});


const connectDB = async () => {
  const { DB_HOST, DB_PORT, DB_NAME } = process.env;
  await Mongoose.connect(`mongodb+srv://aselcuktuncer:tKzxap3pWK9DPrW@turkcell-ad-deigner-sui.06x58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
};



connectDB();
const listAllTemplates = async () => {
  console.log("gir");
  console.log(usern);
 // console.log(filter_type);
  const userFav = await User.findOne({
    username: usern,
     });

   
  const data = await Template.find({});
  console.log("data:",data);
  let templates = [];

  
  
  for (let index = 0; index < data.length; index++) {
    templates[index] = data[index]._doc;
  }
  TemplateList.innerHTML = "";

  console.log("t1",templates);
  username_profile.innerHTML =`${userFav.name}`;
  surname_profile.innerHTML=`${userFav.surname}`;
  console.log("t",templates);


  if(userFav.role == "Visitor"){

  templates.map(t => {
    TemplateList.innerHTML += `
      <div class="col-sm-4" >
      
    <div class="position-relative p-3 bg-gray" style="height: 180px">
    
      <div class="ribbon-wrapper">
        <div class="ribbon bg-info">
          Builder
          
        </div>
      </div>
      <a  id="templateName${t.num}" onclick="mouseClickName(${t.num})">
      Template <br></a>
      
      <small> # ${t.num}</small>
      <small>  ${t.tag} </small>
      
    
    <img src="${t.link}" alt="Flowers in Chania" width="128" height="128" >
      <div style="position: absolute;
      bottom: 10px;
      right: 105px;">
      
        <i class="fas fa-eye" id="eye${t.num}" onclick="mouseClickEye(${t.num})"></i>
        
      </div>

      <div style="position: absolute;
      bottom: 10px;
      right: 75px;">
      
        <i class="fas fa-heart" style=" cursor: pointer" id="like${t.num}" onclick="mouseClickVisitorLike(${t.num})"
          ></i>
      </div>
      <div class="row-6-md" style="position: absolute;
    bottom: 10px;
    right: 45px;">

        <div class="tools">

          <i class="fas fa-download" id="demo${t.num}" onmouseover="mouseOver( ${t.num})" onmouseout="mouseOut( ${t.num})" ></i>
          <a href="${t.link}" download="${t.link}"></a>
        </div>
      </div>
      <div style="position: absolute;
      bottom: 10px;
      right: 15px;">
        <i class="fas fa-share" id="share${t.num}" onmouseover="mouseOverShare( ${t.num})"
          onmouseout="mouseOutShare( ${t.num})"></i>
      </div>

    </div>
    <br />
    </div>


  
      `;
});
  }
  else{

  

  templates.map(t => {
      TemplateList.innerHTML += `
      <div class="col-sm-4" >
      
    <div class="position-relative p-3 bg-gray" style="height: 180px">
    
      <div class="ribbon-wrapper">
        <div class="ribbon bg-info">
          Builder
          
        </div>
      </div>
      <a  id="templateName${t.num}" onclick="mouseClickName(${t.num})">
      Template <br></a>
      
      <small> # ${t.num}</small>
      <small>  ${t.tag} </small>
       
    
    <img src="${t.link}" alt="Flowers in Chania" width="128" height="128" >
      <div style="position: absolute;
      bottom: 10px;
      right: 105px;">
      
        <i class="fas fa-eye" id="eye${t.num}" onclick="mouseClickEye(${t.num})"></i>
        
      </div>

      <div style="position: absolute;
      bottom: 10px;
      right: 75px;">
      
        <i class="fas fa-heart" style=" cursor: pointer" id="like${t.num}"
          onclick="mouseClickLike(${t.num})"></i>
      </div>
      <div class="row-6-md" style="position: absolute;
    bottom: 10px;
    right: 45px;">

        <div class="tools">

          <i class="fas fa-download" id="demo${t.num}" onmouseover="mouseOver( ${t.num})" onmouseout="mouseOut( ${t.num})" ></i>
          <a href="${t.link}" download="${t.link}"></a>
        </div>
      </div>
      <div style="position: absolute;
      bottom: 10px;
      right: 15px;">
        <i class="fas fa-share" id="share${t.num}" onmouseover="mouseOverShare( ${t.num})"
          onmouseout="mouseOutShare( ${t.num})"></i>
      </div>

    </div>
    <br />
    </div>

  
    
        `;
  });

}
  
};

async function renderTemp(TemplateList) {
  console.log("rendertemp");
  templates = await listAllTemplates();
}

const listFilteredTemplates = async (filter_type) => {
  console.log(filter_type);
  
  const data = await Template.find({
    tag : filter_type
  });
  const userFav = await User.findOne({
    username: usern,
     });
  console.log("data:",data);
  let templates = [];
  
  for (let index = 0; index < data.length; index++) {
    templates[index] = data[index]._doc;
  }
  TemplateList.innerHTML = "";

  console.log("t1",templates);
  username_profile.innerHTML =`${userFav.name}`;
  surname_profile.innerHTML=`${userFav.surname}`;
  console.log("t",templates);

  templates.map(t => {
      TemplateList.innerHTML += `
      <div class="col-sm-4" >
      
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper">
        <div class="ribbon bg-info">
          Builder
          
        </div>
      </div>
      <a  id="templateName${t.num}" onclick="mouseClickName(${t.num})">
      Template <br></a>
      <small> # ${t.num}</small>
      <small>  ${t.tag} </small>
    </a>
      <div style="position: absolute;
      bottom: 10px;
      right: 105px;">
        
        <i class="fas fa-eye" id="eye${t.num}" onclick="mouseClickEye(${t.num})"></i>
        
      </div>
      <img src="${t.link}" alt="Flowers in Chania" width="128" height="128" >
      <div style="position: absolute;
      bottom: 10px;
      right: 75px;">
        <i class="fas fa-heart" id="like${t.num} " style="cursor:pointer"
          onclick="mouseClickLike(${t.num})"></i>
      </div>
      <div class="row-6-md" style="position: absolute;
    bottom: 10px;
    right: 45px;">

        <div class="tools">

          <i class="fas fa-download" id="demo${t.num}" onmouseover="mouseOver( ${t.num})" onmouseout="mouseOut( ${t.num})" ></i>
          <a href="${t.link}" download="${t.link}"></a>
        </div>
      </div>
      <div style="position: absolute;
      bottom: 10px;
      right: 15px;">
        <i class="fas fa-share" id="share${t.num}" onmouseover="mouseOverShare( ${t.num})"
          onmouseout="mouseOutShare( ${t.num})"></i>
      </div>

    </div>
    <br />
    </div>
    
        `;
  });

};
async function renderFilterTemp(filter_type,TemplateList) {
  console.log("renderFilterTemp");
  console.log(filter_type);
  templates = await listFilteredTemplates(filter_type);
}




const listFavTemplates = async () => {
  //var FavTempList = document.querySelector('#favTemplate');
  console.log(usern);
  const userFav = await User.findOne({
  username: usern,
   });
 
  console.log(userFav.likes)
  const data = await Template.find({
    num : userFav.likes
  });
  
  console.log("data:",data);
  let favtemplates = [];
  username_profile.innerHTML =`${userFav.name}`;
  surname_profile.innerHTML=`${userFav.surname}`;
  for (let index = 0; index < data.length; index++) {
    favtemplates[index] = data[index]._doc;
  }



  
  console.log("t2",favtemplates);
  favTemplateList.innerHTML = "";
  console.log("t3",favtemplates);
  // FavTempList.innerHTML+= `<p> fsdgsd </p>`
   favtemplates.map(k=> {
    favTemplateList.innerHTML += `
      <div class="col-sm-4" >
      
    <div class="position-relative p-3 bg-gray" style="height: 180px">
      <div class="ribbon-wrapper">
        <div class="ribbon bg-info">
          Builder
          
        </div>
      </div>
      <a href="${k.link}">
      Template <br></a>
      <small> # ${k.num}</small>
      <small>  ${k.tag} </small>
    </a>
      <div style="position: absolute;
      bottom: 10px;
      right: 105px;">
        
        <i class="fas fa-eye" id="eye${k.num}" onmouseover="mouseOverEye( ${k.num})" onmouseout="mouseOutEye( ${k.num})"></i>
        
      </div>

      <div style="position: absolute;
      bottom: 10px;
      right: 75px;">
        <i class="fas fa-heart" id="like${k.num}" style="color:red; cursor: pointer" 
        onclick="mouseClickLike(${k.num})"
         ></i>
      </div>
      <div class="row-6-md" style="position: absolute;
    bottom: 10px;
    right: 45px;">

        <div class="tools">

          <i class="fas fa-download" id="demo${k.num}" onmouseover="mouseOver( ${k.num})" onmouseout="mouseOut( ${k.num})"></i>

        </div>
      </div>
      <div style="position: absolute;
      bottom: 10px;
      right: 15px;">
        <i class="fas fa-share" id="share${k.num}" onmouseover="mouseOverShare( ${k.num})"
          onmouseout="mouseOutShare( ${k.num})"></i>
      </div>

    </div>
    <br />
    </div>
    
        `;
  });
  


};


async function renderFavTemp(favTemplateList,username_profile,surname_profile,usern) {
  console.log("renderfavtemp");
  console.log(usern);

  templates = await listFavTemplates();
};

const listContacts = async () => {
  console.log(templatetosee);
  const templateToSee = await Template.findOne({
   num: templatetosee,
   });
 
  console.log(templatetosee)
  const data = await User.find({
    likes : templatetosee,
  });
  
  console.log("data:",data);
  let contacts = [];
  
  for (let index = 0; index < data.length; index++) {
    contacts[index] = data[index]._doc;
  }
  const userFav = await User.findOne({
    username: usern,
     });
  
  console.log("t2",contacts);
  contactlist.innerHTML = "";
  console.log("t3",contacts);
  username_profile.innerHTML =`${userFav.name}`;
  surname_profile.innerHTML=`${userFav.surname}`;
  // FavTempList.innerHTML+= `<p> fsdgsd </p>`
  contacts.map(c=> {
    contactlist.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
    <div class="card bg-light d-flex flex-fill">
      <div class="card-header text-muted border-bottom-0">
      Company Kind : ${c.surname}
      </div>
      <div class="card-body pt-0">
        <div class="row">
          <div class="col-7">
            <h2 class="lead"><b>Company Name: ${c.name}</b></h2>
            <ul class="ml-4 mb-0 fa-ul text-muted">
              <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Contact: ${c.email}</li>
            </ul>
            <ul class="ml-4 mb-0 fa-ul text-muted">
              <li class="small"><span class="fa-li"><i class="fab fa-adversal"></i></span> Role: ${c.role}</li>
            </ul>
          </div>
          <div class="col-5 text-center">
          <img src="../../../dist/img/com-logo.png" class="img-circle img-fluid">
        </div>
        </div>
      </div>
    </div>
  </div>
        `;
  });
  


};





async function renderCont(contactlist,y,username_profile,surname_profile) {
  console.log("renderCont");
  console.log(y);

  templates = await listContacts();
};

ipcMain.on('register', async (event, data) => {
  console.log(data);
  prob = Object.values(data);
  console.log(prob);
  let empty_area = false;
  for (var elm in prob) {
    
    if (prob[elm].length==0) {
      empty_area = true;
    }
    
  }
  if (empty_area) {
    let swalOptions7 = {
      position: "top-end",
      title: "You must fill all areas!",
      icon: "error",
      showConfirmButton: true,
      timer: 3000
    };
    event.reply("onRegister", false);

    Alert.fireToast(swalOptions7);
  }
  let role1 = data.role;
  let pass_check = data.password_check;

  if (parseInt(role1) == 3) {
    role1 = "Publisher"
  }
  else if (parseInt(role1)==2) {
    role1 = "Advertiser"
  }
  else{
    role1 = "Visitor"
  }
  console.log(role1);
  user = new User({name: data.name,
    surname:data.surname,
    username: data.username,
    email:data.email,
    role: role1,
    password: passwordToHash(data.password)}); 
    
  
  emailformat = (data.email).includes("@")  ;
  console.log(emailformat);
  if (user && !empty_area) {
    const user1 = await User.findOne({
      username: data.username,
      });
    const user2 = await User.findOne({
      email: data.email,
      });
      if(user1){
        let swalOptions5 = {
            position: "top-end",
            title: "This username is already taken!",
            icon: "error",
            showConfirmButton: true,
            timer: 3000
          };
          event.reply("onRegister", false);

          Alert.fireToast(swalOptions5);
      }
      else if(user2){
        let swalOptions6 = {
          position: "top-end",
          title: "This email is already taken!",
          icon: "error",
          showConfirmButton: true,
          timer: 3000
        };
        event.reply("onRegister", false);
        Alert.fireToast(swalOptions6);
      }
      else if (pass_check!=data.password) {
        let swalOptions6 = {
          position: "top-end",
          title: "Passwords do not match!",
          icon: "error",
          showConfirmButton: true,
          timer: 3000
        };
        event.reply("onRegister", false);

        Alert.fireToast(swalOptions6);
      }
      else if (!emailformat) {
        let swalOptions11 = {
          position: "top-end",
          title: "Email should be in mail format !",
          icon: "error",
          showConfirmButton: true,
          timer: 3000
        };
        event.reply("onRegister", false);

        Alert.fireToast(swalOptions11);
      }
      else {
        let swalOptions6 = {
          position: "top-end",
          title: "User is sucessfully registered!",
          icon: "success",
          showConfirmButton: true,
          timer: 3000
        };
        event.reply("onRegister", true);

        Alert.fireToast(swalOptions6);
        await user.save(); 
      }
    } 
  
})


ipcMain.on('forgot-password', async (event1, data) => {
  userForChangePassword = data.email;
  const user = await User.findOne({
    email: data.email,
  });
  if(user){
    val = Math.floor(1000 + Math.random() * 9000);
    let swalOptions = {
      position: "top-end",
      title: "E-mail will be sent soon, please check your spam folder",
      icon: "success",
      showConfirmButton: true,
      timer: 3000
    };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: "turkcellad22@gmail.com",
            pass: "Harika_22",
        },
    })
    
    let mailOptions = {
      from: "turkcellad22@gmail.com",
      to: data.email,
      subject: "Turkcell Ad - Forgot Password Code", 
      html: '<h1> Your code is: </h1> ' + val,
    }
    transporter.sendMail(mailOptions, (err,data) => {
      if(err){
        console.log(err);
      }
      else{
        console.log('Mail is sent');
        event1.reply("onFP", true);
        Alert.fireToast(swalOptions);
      }
    })
  }
  else{
    let swalOptions3 = {
      position: "top-end",
      title: "Email is not registered",
      icon: "error",
      showConfirmButton: true,
      timer: 3000
    };

    event1.reply("onFP", false);
    Alert.fireToast(swalOptions3);
  }
})


ipcMain.on('code_Check', async (event2, data) => {
  if(data.code == val){
    let swalOptions3 = {
      position: "top-end",
      title: "Code is correct.",
      icon: "success",
      showConfirmButton: true,
      timer: 3000
    };

    event2.reply("codeCheck", true)
    Alert.fireToast(swalOptions3);
  }
  else{
    let swalOptions3 = {
      position: "top-end",
      title: "Code is not correct.",
      icon: "error",
      showConfirmButton: true,
      timer: 3000
    };

    event2.reply("codeCheck", false)
    Alert.fireToast(swalOptions3);
  }
})
ipcMain.on('login', async (event, data) => {
  console.log(data);
  const user = await User.findOne({
    username: data.username,
  });
    if(user){
      if(passwordToHash(data.password) == user.password){
        usernameForlike = data.username;
        let swalOptions = {
          position: "top-end",
          title: "Signed in successfully",
          icon: "success",
          showConfirmButton: true,
          timer: 3000
        };
        console.log()
        event.reply("onLogin", true);
        Alert.fireToast(swalOptions);
      }
      else{
        let swalOptions2 = {
          position: "top-end",
          title: "Password is incorrect",
          icon: "error",
          showConfirmButton: true,
          timer: 3000
        };

        event.reply("onLogin", false);
        Alert.fireToast(swalOptions2);
      }
    }
    else{
      let swalOptions3 = {
        position: "top-end",
        title: "User is not found",
        icon: "error",
        showConfirmButton: true,
        timer: 3000
      };

      event.reply("onLogin", false);
      Alert.fireToast(swalOptions3);
    }
})
ipcMain.on('passCheck', async (event4, data) => {
  console.log("315");
  if(data.pass1 == data.pass2){
    await User.updateOne({
      email: userForChangePassword
      }, {
          $set: {
              password: passwordToHash(data.pass1)
          }
      })
    let swalOptions3 = {
      position: "top-end",
      title: "Your password has been changed successfully!",
      icon: "success",
      showConfirmButton: true,
      timer: 3000
    };

    event4.reply("passwordCheck_", true);
    Alert.fireToast(swalOptions3);
  }
  else{
    let swalOptions3 = {
      position: "top-end",
      title: "Passwords should match.",
      icon: "error",
      showConfirmButton: true,
      timer: 3000
    };

    event4.reply("passwordCheck_", false);
    Alert.fireToast(swalOptions3);
  }
})

ipcMain.on('favlike', async (event, data) => {
  const userFav = await User.findOne({
    username: usernameForlike,
     });

     const userfavLike = Object.values(userFav.likes);

     console.log("kdsfjsdkdsfjsd",Object.values(userFav.likes));
     console.log(userfavLike);
     event.reply("onLike",Object.values(userFav.likes))
})





ipcMain.on('like', async (event5,data) => {
  
  
  console.log(data.id);
  console.log(data.liked);
  let user = await User.findOne(
    { username : usernameForlike }
    );
    
    //num = Object.values(data.id)[0] 
    num = data.id;
    let like = await User.findOne({
      username : usernameForlike,
      likes: num,
    });
  if (data.liked == true) {
    
      console.log("entered to like");
      if(user.role == "Publisher" || user.role =="Advertiser"){
        
        
          await User.updateOne({ "username" : usernameForlike },
          { $push: { "likes" : data.id } })
    
          let swalOptions12 = {
            position: "top-end",
            title: "Template is added to favorites !",
            icon: "success",
            showConfirmButton: true,
            timer: 3000
          };
        
          Alert.fireToast(swalOptions12);
        
      }else {
        console.log("Wrong Role!")
        let swalOptions4 = {
          position: "top-end",
          title: "You have to be Advertiser or Publisher to use Like Feature",
          icon: "error",
          showConfirmButton: true,
          timer: 3000
        };
        
        event5.reply("onRoleCheck", false);
        Alert.fireToast(swalOptions4);
      }
    }
    else{
      console.log("entered here");
      if(like){
        await User.updateOne({ "username" : usernameForlike },
        { $pull: { "likes" : data.id } })

        let swalOptions13 = {
          position: "top-end",
          title: "Template is deleted from favorites",
          icon: "success",
          showConfirmButton: true,
          timer: 3000
        };
        Alert.fireToast(swalOptions13);
      }


    }
      
      
      
      
    })
    
    
    ipcMain.on('eye', async (event7) => {
  console.log("Template will opened")
})
