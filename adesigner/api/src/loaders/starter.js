
const TemplateList = document.querySelector("#TemplateList");
const username_profile = document.querySelector("#username_profile");
const surname_profile = document.querySelector("#surname_profile");
async function renderTemplates(){
    await renderTemp(TemplateList,username_profile,surname_profile);
}

const favTemplateList = document.querySelector("#favTemplateList");
const usern = localStorage.getItem('username');
function renderFavTemplates(){
    console.log(favTemplateList);

    renderFavTemp(favTemplateList,username_profile,surname_profile,usern);
}

const contactlist = document.querySelector("#contactlist");
const templatetosee = localStorage.getItem('templatetosee');

function renderContacts(){
    console.log(templatetosee)
    console.log(contactlist);
    renderCont(contactlist,templatetosee,username_profile,surname_profile,usern);
}

function renderFilterTemplates(filter_type){
    console.log(filter_type);
    renderFilterTemp(filter_type,TemplateList);
}