//------------------------------------Global Var e condizioni iniziali--------------------------------------------------------------------------

var membersArr = data.results[0].members;

var percent = Math.round(membersArr.length * 10 / 100);
console.log(percent) 

if (window.location.href.includes("loyalty")) {
    
    var statistics = {
    Ndemocratic: calculateparty("D"),
    Nindipendent: calculateparty("I"),
    Nrepublic: calculateparty("R"),
    Totalmemb: Total(),
    averageTotal: Totalaverage(),
    averageDemocratic: averageParty("D"),
    averageRepublic: averageParty("R"),
    averageIndipendent: averageParty("I"),
    bottom: leastLoyal(),
    top:moreLoyal(),
    //    topattend: moreattend(),
    //bottomattend: lessattend(),
}
    
   buildmoreLoyal()
    console.log("ciao ciao  ")
    buildLeastLoyal()
    tableGlance()
    TableGlancepct()
} 
else if (window.location.href.includes("attend")){
    
    var statistics = {
    Ndemocratic: calculateparty("D"),
    Nindipendent: calculateparty("I"),
    Nrepublic: calculateparty("R"),
    Totalmemb: Total(),
    averageTotal: Totalaverage(),
    averageDemocratic: averageParty("D"),
    averageRepublic: averageParty("R"),
    averageIndipendent: averageParty("I"),
//    bottom: leastLoyal(),
//    top:moreLoyal(),
        topattend: moreattend(),
    bottomattend: lessattend(),
}
    tableMoreattend()
    tablebottomattend()
    tableGlance()
    TableGlancepct()
    console.log("zumma zumma baccalà")
}
//-----------------------------------End condition and global variable--------------------------------------------------------------------------

//-----------------------------------------------Begin Statistics-------------------------------------------------------------------------------
var statistics = {
    Ndemocratic: calculateparty("D"),
    Nindipendent: calculateparty("I"),
    Nrepublic: calculateparty("R"),
    Totalmemb: Total(),
    averageTotal: Totalaverage(),
    averageDemocratic: averageParty("D"),
    averageRepublic: averageParty("R"),
    averageIndipendent: averageParty("I"),
    bottom: leastLoyal(),
//    top:moreLoyal(),
    //    topattend: moreattend(),
    //bottomattend: lessattend(),
}

//-------------------------------------Fine stastiche-------------------------------------------------------------------------------------------


//--------------------------------------Function for calculate party  and average---------------------------------------------------------------

function calculateparty(party) {
    var partido = [];

    var membersArr = data.results[0].members;
    for (i = 0; i < membersArr.length; i++) {

        if (membersArr[i].party == party) {

            partido.push(membersArr[i]);
            console.log(partido)
        }

    }

    return partido.length
};


function Total(membersArr) {
    var membersArr = data.results[0].members;
    console.log(membersArr)

    var total = [];

    for (i = 0; i < membersArr.length; i++) {
        total.push(membersArr[i]);
    }
    var longitudinetot = total.length;

    return longitudinetot

}



//prova funzione  average democratici
//function average(party,votes_with_party_pct){
//funzione calcolo totale 
function Totalaverage() {

    var membersTotal = data.results[0].members;

    var SumTotalVotes = [];

    var sum = 0;

    // put in a empty array the all vote 

    for (i = 0; i < membersTotal.length; i++) {

        SumTotalVotes.push(membersTotal[i].votes_with_party_pct);

        sum = sum + SumTotalVotes[i];
    }

    console.log(SumTotalVotes);
    console.log(sum);
    average = sum / SumTotalVotes.length;
    console.log(average);

    return average;
}

function averageParty(party) {

    var total = calculateparty(party);

    var membersPerParty = data.results[0].members;

    var SumTotalVotes = [];

    var TotalMembersParty = [];


    var sum = 0;

    //I Make an array to put the total number members per party

    for (var i = 0; i < membersPerParty.length; i++) {


        if (membersPerParty[i].party == party) {

            TotalMembersParty.push(membersPerParty[i]);
        }
    }

    //I make a loop to put the total votes in a new array 


    for (var i = 0; i < TotalMembersParty.length; i++) {

        SumTotalVotes.push(TotalMembersParty[i].votes_with_party_pct);

        //Sumatory

        sum = sum + SumTotalVotes[i];
    }

    var average = sum / total;

    return average;
}
//----------------------------------------Calculate-least/more and----create table -----------------------------------------------------------

function leastLoyal() {
    console.log(data.results[0].members)
    var low = [];
    var membersArr = Array.from(data.results[0].members);

    console.log(membersArr)



    membersArr.sort(function (x, y) {
        return x.votes_with_party_pct - y.votes_with_party_pct

    });


    for (var i = 0; i < membersArr.length; i++) {
        if (i < percent) {
            low.push(membersArr[i]);
        } else if (low[percent - 1].votes_with_party_pct == membersArr[i].votes_with_party_pct) {
            low.push(membersArr[i]);
        } else {
            break;
        }


        console.log(membersArr)
    }
    console.log(low)
    return low;
}

function buildLeastLoyal() {
    var table = document.getElementById("least");
    console.log("longitudine", statistics.bottom.length)
    for (var i = 0; i < statistics.bottom.length; i++) {
        var row = document.createElement("tr");
        var link = document.createElement("a");

        link.textContent = statistics.bottom[i].first_name + " " + (statistics.bottom[i].middle_name || "") + " " + statistics.bottom[i].last_name;
        link.setAttribute("href", statistics.bottom[i].url);
        row.insertCell().append(link);
        //        link.setAttribute("href", statistics.bottom[i].url);
        //        row.insertCell().innerHTML = statistics.bottom[i].first_name + " " +(statistics.bottom[i].middle_name || "") + " " + statistics.bottom[i].last_name;
        row.insertCell().innerHTML = statistics.bottom[i].total_votes;
        row.insertCell().innerHTML = statistics.bottom[i].votes_with_party_pct;

        table.append(row);


    }


}
function moreLoyal() {
    
    var membersArr=Array.from(data.results[0].members);
    console.log(membersArr)

    var topLoyal = [];
    membersArr.sort(function (x, y) {
        return y.votes_with_party_pct - x.votes_with_party_pct
        console.log(membersArr);
    });
    
    
    for (var i = 0; i < membersArr.length; i++) {
        if (i < percent) {
            
            console.log("ciao")
            topLoyal.push(membersArr[i]);
            console.log(topLoyal)
        } else if (topLoyal[percent - 1].votes_with_party_pct == membersArr[i].votes_with_party_pct) {
            topLoyal.push(membersArr[i]);
        } else {
            break;
        }
//        topLoyal = membersArr.splice(0, percent);
   

} 
return topLoyal

} 

function buildmoreLoyal() {
    var table = document.getElementById("more");
    console.log("longitudine", statistics.top.length)
    for (var i = 0; i < statistics.top.length; i++) {
        var row = document.createElement("tr");
        var link = document.createElement("a");

        link.textContent = statistics.top[i].first_name + " " + (statistics.top[i].middle_name || "") + " " + statistics.top[i].last_name;
        link.setAttribute("href", statistics.top[i].url);
        row.insertCell().append(link);
        //        link.setAttribute("href", statistics.bottom[i].url);
        //        row.insertCell().innerHTML = statistics.bottom[i].first_name + " " +(statistics.bottom[i].middle_name || "") + " " + statistics.bottom[i].last_name;
        row.insertCell().innerHTML = statistics.top[i].total_votes;
        row.insertCell().innerHTML = statistics.top[i].votes_with_party_pct;

        table.append(row);


    }


} 
function moreattend() {
    
    var membersArr2=Array.from(data.results[0].members);
    var topattend = [];
     membersArr.sort(function (x, y) {
        return x.missed_votes_pct - y.missed_votes_pct
    });

    for (var i = 0; i < membersArr2.length; i++) {
        if (i < percent) {
            topattend.push(membersArr[i]);
        } else if (topattend[percent - 1].missed_votes_pct == membersArr2[i].missed_votes_pct) {
            topattend.push(membersArr[i]);
        } else {
            break;
        }
    
    
    console.log(topattend);
    

} 
return topattend;

} 

function tableMoreattend() {

    var table = document.getElementById("topattend");
    console.log("longitudine", statistics.topattend.length)
    for (var i = 0; i < statistics.topattend.length; i++) {
        var row = document.createElement("tr");
        var link = document.createElement("a");

        link.textContent = statistics.topattend[i].first_name + " " + (statistics.topattend[i].middle_name || "") + " " + statistics.topattend[i].last_name;
        link.setAttribute("href", statistics.topattend[i].url);
        row.insertCell().append(link);
        //        link.setAttribute("href", statistics.bottom[i].url);
        //        row.insertCell().innerHTML = statistics.bottom[i].first_name + " " +(statistics.bottom[i].middle_name || "") + " " + statistics.bottom[i].last_name;
        row.insertCell().innerHTML = statistics.topattend[i].missed_votes;
        row.insertCell().innerHTML = statistics.topattend[i].missed_votes_pct;

        table.append(row);

    }
}


function lessattend() {
    
    var membersArr=Array.from(data.results[0].members);
    bottomattend=[];
    membersArr.sort(function (x, y) {
        return y.missed_votes_pct - x.missed_votes_pct
    });
    console.log(membersArr)
    
    
for (var i = 0; i < membersArr.length; i++) {
        if (i < percent) {
            bottomattend.push(membersArr[i]);
        } else if (bottomattend[percent - 1].missed_votes_pct == membersArr[i].missed_votes_pct) {
            bottomattend.push(membersArr[i]);
        } else {
            break;
        }
    
    
    console.log(bottomattend);
    

} 
    
    return bottomattend;
}


function tablebottomattend() {

    var table = document.getElementById("bottomattend");
    console.log("longitudine", statistics.bottomattend.length)
    for (var i = 0; i < statistics.bottomattend.length; i++) {
        var row = document.createElement("tr");
        var link = document.createElement("a");

        link.textContent = statistics.bottomattend[i].first_name + " " + (statistics.bottomattend[i].middle_name || "") + " " + statistics.bottomattend[i].last_name;
        link.setAttribute("href", statistics.bottomattend[i].url);
        row.insertCell().append(link);
        //        link.setAttribute("href", statistics.bottom[i].url);
        //        row.insertCell().innerHTML = statistics.bottom[i].first_name + " " +(statistics.bottom[i].middle_name || "") + " " + statistics.bottom[i].last_name;
        row.insertCell().innerHTML = statistics.bottomattend[i].missed_votes;
        row.insertCell().innerHTML = statistics.bottomattend[i].missed_votes_pct;

        table.append(row);

    }
}

function TableGlancepct() {
    
    var tableReppct = document.querySelector("#glance").rows;
    var nuovaFilaReppct = document.createElement("td");
    nuovaFilaReppct.innerHTML = statistics.averageRepublic;
    tableReppct[0].append(nuovaFilaReppct);
    
    var tableDempct = document.querySelector("#glance").rows;
    var nuovaFilaDempct = document.createElement("td");
    nuovaFilaDempct.innerHTML = statistics.averageDemocratic;
    tableDempct[1].append(nuovaFilaDempct);
    
    var tableInpct = document.querySelector("#glance").rows;
    var nuovaFilaInpct = document.createElement("td");
    nuovaFilaInpct.innerHTML = statistics.averageIndipendent;
    tableInpct[2].append(nuovaFilaInpct);
    
    var tabletotpct = document.querySelector("#glance").rows;
    var nuovaFilatotpct = document.createElement("td");
    nuovaFilatotpct.innerHTML = statistics.averageTotal;
    tabletotpct[3].append(nuovaFilatotpct);

    

}
function tableGlance() {

    var tableRep = document.querySelector("#glance").rows;
    var newFilaRep = document.createElement("td");
    newFilaRep.innerHTML = statistics.Nrepublic;
    tableRep[0].append(newFilaRep);

    var tableDem = document.querySelector("#glance").rows;
    var newFilaDem = document.createElement("td");
    newFilaDem.innerHTML = statistics.Ndemocratic;
    tableDem[1].append(newFilaDem);

    var tableIn = document.querySelector("#glance").rows;
    var newFilaIn = document.createElement("td");
    newFilaIn.innerHTML = statistics.Nindipendent;
    tableIn[2].append(newFilaIn);

    var tableTot = document.querySelector("#glance").rows;
    var newFilaTot = document.createElement("td");
        newFilaTot.innerHTML = statistics.Totalmemb;
    tableIn[3].append(newFilaTot);

}

//----------------------------------------------End calculate least/more and create table--------------------------------------------------






//tablebottomattend();
//tableMoreattend();



//create moreattendtable 







//buildmoreLoyal()

//fine costruzione moreLoyal


//riempiamo le celle della tabellaglance


//Secondly the % of votes



//fill  least loyal bottom 



//buildLeastLoyal()



//filtrare gli array
//trovare il valore più piccolo 
//trovare un modo di mettere questi valori piccoli in un nuovo array che ti da il 10% dei valori più piccoli

//calcolare la percentuale  di tutto l' array e costruire un nuovo array con quella percentuale quindi un array che contiene n% elementi
