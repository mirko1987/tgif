//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);


//remove a duplicate a element in array 

//---------------------------------Prova con variabili globali al interno della funzione--------------------------------------------//

var membersArr;
var myLoader;





//-----------------------------------End Prova -----------------------------------------------------------------------------------//
//function showPage() {
//    document.getElementById("loader").style.display = "none";
//    document.getElementById("myDiv").style.display = "block";
//}

//------------------------------------------Fetch Begin------------------------------------------------------------------------------//


if(window.location.href.includes("senate")){
    
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"

    
    
}

else if (window.location.href.includes("house")){
    
     var url = "https://api.propublica.org/congress/v1/113/house/members.json"
    
}







fetch(url, {
        headers: {
            "X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
        }
    
    })


    .then(function (response) {
    
    
        if (response.ok){
            return response.json();}
    else {
                        throw new Error('Unable to retrieve data');
                    }
    })

    

    .then(function (json) {
//        var data = json;
//        console.log("data", data);
    console.log(json)
         membersArr=json.results[0].members;
    buildTable(membersArr);
    populatedrop(membersArr);
//        filter_party(membersArr);
//        var optionsStates = populatedrop(membersArr);

    })









//------------------------------------------Fetch End------------------------------------------------------------------------------//


//----------------------------------------------------javascript normal-----------------------------------------------------------//

var selected_party_members = [];



//end of duplicate element 

var table = document.getElementById("senata-data");

//var membersArr = data.results[0].members;

//buildTable(membersArr);
//populate  dropdown list with array
//populatedrop(membersArr);

function populatedrop(membersArr) {
    var stateArray = [...new Set(membersArr.map(member => member.state).sort())];
    console.log(stateArray);

    var dropDown = document.getElementById("state_list");
   

    for (var i = 0; i < stateArray.length; i++) {
        console.log(stateArray);
        //modificare qui 

        var option = document.createElement("option");
        option.setAttribute("value", stateArray[i]);
        console.log(option);
        txt = document.createTextNode(stateArray[i]);

        option.appendChild(txt);
        dropDown.insertBefore(option, dropDown.lastChild);






    }

}





function buildTable(membersArr) {

    document.getElementById("senate-data").innerHTML = "";

    for (var i = 0; i < membersArr.length; i++) {

        var row = document.createElement("tr");
        var link = document.createElement("a");





        link.textContent = membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name;
        link.setAttribute("href", membersArr[i].url)

        row.insertCell().append(link);
        row.insertCell().innerHTML = membersArr[i].party;
        row.insertCell().innerHTML = membersArr[i].state;
        row.insertCell().innerHTML = membersArr[i].seniority;
        row.insertCell().innerHTML = membersArr[i].total_votes;
        row.insertCell().innerHTML = membersArr[i].votes_with_party_pct;



        document.getElementById("senate-data").append(row)

    }


}
//build table



//scrivere la funzione del check qui 



//listen
document.getElementById("democratic").addEventListener("click", function () {
    filter_party(membersArr)
});
document.getElementById("republic").addEventListener("click", function () {
    filter_party(membersArr)
});
document.getElementById("indipendent").addEventListener("click", function () {
    filter_party(membersArr)
});
document.getElementById("state_list").addEventListener("change", function () {
    filter_party(membersArr)
});


//listen
//filtra array


//function state_filter(membersArray){
//    var selected_state = document.getElementById("state_list").value;
//    var prova=[];
//     
//    
//    console.log(selected_state);
//    for(i=0;i<membersArray.length;i++){
//        if(selected_state==membersArray[i].state){
//            prova.push(membersArray[i]);
//            console.log(prova);
//            
//        }
//        else{
//            console.log("ciao")
//        }
//            
//        } buildTable(prova)
//    }
//    


//fine prova filtra stati
function filter_party(membersArray) {
console.log(membersArray)
    /*
     */
    var selected_state = document.getElementById("state_list").value;
    var selected_party_members = [];

    for (var i = 0; i < membersArray.length; i++) {
        if ((document.getElementById("democratic").checked && membersArray[i].party == "D") && (selected_state == membersArray[i].state || selected_state == "ALL")) {
            console.log("Emtra aquèi")
            selected_party_members.push(membersArray[i]);
        }
        if ((document.getElementById("republic").checked && membersArray[i].party == "R") && (selected_state == membersArray[i].state || selected_state == "ALL")) {
            console.log("Emtra aquèi 2")

            selected_party_members.push(membersArray[i]);
        }


        if ((document.getElementById("indipendent").checked && membersArray[i].party == "I") && (selected_state == membersArray[i].state || selected_state == "ALL")) {
            console.log("Emtra aquèi 33")

            selected_party_members.push(membersArray[i]);
        }

        if (document.getElementById("democratic").checked == false && (document.getElementById("indipendent").checked == false) && (document.getElementById("republic").checked == false) && (selected_state == "ALL")


        ) {

            console.log("Emtra aquèi 33")

            selected_party_members = membersArray;

        }
        if (document.getElementById("democratic").checked == false && (document.getElementById("indipendent").checked == false) && (document.getElementById("republic").checked == false) && (selected_state == membersArray[i].state)) {
            selected_party_members.push(membersArray[i]);
        }
    }

    console.log("Emtra aquèi SALE")

    //cambiare il parametro build table

    buildTable(selected_party_members)
}








//fine filtra array
